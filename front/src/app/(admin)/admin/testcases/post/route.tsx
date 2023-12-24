import { getUserByToken } from "@/app/(pages)/contests/[contest]/tasks/@component/users";
import redis from "@/app/redis";
import { sql } from "@/app/sql";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
	const data = await req.formData();
	const cookie = cookies();
	const user = await getUserByToken(sql, cookie.get("cc")?.value, cookie.get("ct")?.value);
	if (!user || user.admin == false) {
		return new Response("Unauthorized", {
			status: 401
		});
	}

	if (!data.has("type") || typeof data.get("task_id") != "string") {
		console.log(data.get("type"), data.get("task_id"));
		return new Response("Bad Request", {
			status: 400
		});
	}

	const parseFunc = (str: string) => JSON.stringify(str.split(',').map((value) => value.replace(/[\s\t]/g, "")).filter(Boolean));

	if (data.get("type") == "new") {
		fs.mkdirSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}`);
		fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/dependencies.json`, "[]");
		const inputs = data.getAll("input") as File[];
		const outputs = data.getAll("output") as File[];

		for (let i = 0; i < inputs.length; i++) {
			fs.mkdirSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${inputs[i].name}`);
			fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${inputs[i].name}/in.txt`, await inputs[i].text());
			const output = outputs.find((value) => value.name == inputs[i].name)!!;
			fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${output.name}/out.txt`, await output.text());
			fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${output.name}/config.json`, JSON.stringify({ type: "plane", score: i == 0 ? Number(data.get("score")) : 0 }));
		}

		return new Response("301", { status: 301, headers: { location: `/admin/testcases` } });
	} else if (data.get("type") == "edit") {
		fs.rmSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}`, { recursive: true });
		fs.mkdirSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}`);
		fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/dependencies.json`, "[]");
		const inputs = data.getAll("input") as File[];
		const outputs = data.getAll("output") as File[];

		for (let i = 0; i < inputs.length; i++) {
			fs.mkdirSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${inputs[i].name}`);
			fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${inputs[i].name}/in.txt`, await inputs[i].text());
			const output = outputs.find((value) => value.name == inputs[i].name)!!;
			fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${output.name}/out.txt`, await output.text());
			fs.writeFileSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}/${output.name}/config.json`, JSON.stringify({ type: "plane", score: i == 0 ? Number(data.get("score")) : 0 }));
		}
		
		return new Response("301", { status: 301, headers: { location: `/admin/tasks` } });
	} else if (data.get("type") == "delete") {
		fs.rmSync(`./static/testcases/${data.get("task_id")}/${data.get("id")}`, { recursive: true });
		return new Response("301", { status: 301, headers: { location: `/admin/testcases` } });
	} else {
		return new Response("Bad Request", {
			status: 400
		});
	}
}