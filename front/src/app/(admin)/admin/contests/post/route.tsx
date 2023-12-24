import { getUserByToken } from "@/app/(pages)/contests/[contest]/tasks/@component/users";
import redis from "@/app/redis";
import { sql } from "@/app/sql";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

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
		if (typeof data.get("problems") != "string" || typeof data.get("editor") != "string" || typeof data.get("tester") != "string") {
			return new Response("Bad Request", {
				status: 400
			});
		}

		await sql.query("INSERT INTO contests (name, id, start, period, problems, editor, tester, rated_users, unrated_users, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.get("name"), data.get("id"), data.get("start"), data.get("period"), parseFunc(data.get("problems") as string), parseFunc(data.get("editor") as string), parseFunc(data.get("tester") as string), "[]", "[]", data.get("description")]);
		return new Response("301", { status: 301, headers: { location: `/contests/${data.get("id")}` } });
	} else if (data.get("type") == "edit") {
		if (typeof data.get("problems") != "string" || typeof data.get("editor") != "string" || typeof data.get("tester") != "string" || typeof data.get("id") != "string") {
			return new Response("Bad Request", {
				status: 400
			});
		}

		await sql.query("UPDATE contests SET name = ?, start = ?, period = ?, problems = ?, editor = ?, tester = ?, description = ? WHERE id = ?", [data.get("name"), data.get("start"), data.get("period"), parseFunc(data.get("problems") as string), parseFunc(data.get("editor") as string), parseFunc(data.get("tester") as string), data.get("description"), data.get("id")]);
		await redis.del(`contest:${data.get("id")}`);
		return new Response("301", { status: 301, headers: { location: `/contests/${data.get("id")}` } });
	} else if (data.get("type") == "delete") {
		if (typeof data.get("id") != "string") {
			return new Response("Bad Request", {
				status: 400
			});
		}

		await sql.query("DELETE FROM contests WHERE id = ?", [data.get("id")]);
		await redis.del(`contest:${data.get("id")}`);
		return new Response("301", { status: 301, headers: { location: `/contests` } });
	} else {
		return new Response("Bad Request", {
			status: 400
		});
	}
}