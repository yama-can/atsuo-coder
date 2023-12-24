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

	if (!data.has("type")) {
		return new Response("Bad Request", {
			status: 400
		});
	}

	const parseFunc = (str: string) => JSON.stringify(str.split(',').map((value) => value.replace(/[\s\t]/g, "")).filter(Boolean));

	if (data.get("type") == "new") {
		if (typeof data.get("editor") != "string" || typeof data.get("tester") != "string") {
			return new Response("Bad Request", {
				status: 400
			});
		}

		await sql.query("INSERT INTO tasks (name, id, question, editor, tester, score) VALUES (?, ?, ?, ?, ?, ?)", [data.get("name"), data.get("id"), data.get("question"), parseFunc(data.get("editor") as string), parseFunc(data.get("tester") as string), 0]);
		fs.mkdirSync(`./static/testcases/${data.get("id")}`);
		fs.writeFileSync(`./static/testcases/${data.get("id")}/dependencies.json`, "");
		return new Response("301", { status: 301, headers: { location: `/admin/tasks` } });
	} else if (data.get("type") == "edit") {
		if (typeof data.get("editor") != "string" || typeof data.get("tester") != "string" || typeof data.get("id") != "string") {
			return new Response("Bad Request", {
				status: 400
			});
		}

		await sql.query("UPDATE tasks SET name = ?, question = ?, editor = ?, tester = ? WHERE id = ?", [data.get("name"), data.get("question"), parseFunc(data.get("editor") as string), parseFunc(data.get("tester") as string), data.get("id")]);
		await redis.del(`task:${data.get("id")}`);
		return new Response("301", { status: 301, headers: { location: `/admin/tasks` } });
	} else if (data.get("type") == "delete") {
		if (typeof data.get("id") != "string") {
			return new Response("Bad Request", {
				status: 400
			});
		}

		await sql.query("DELETE FROM tasks WHERE id = ?", [data.get("id")]);
		await redis.del(`task:${data.get("id")}`);
		fs.rmSync(`./static/testcases/${data.get("id")}`, { recursive: true });
		return new Response("301", { status: 301, headers: { location: `/admin/tasks` } });
	} else {
		return new Response("Bad Request", {
			status: 400
		});
	}
}