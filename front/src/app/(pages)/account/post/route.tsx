import { cookies } from "next/headers";
import { getUserByToken } from "../../contests/[contest]/tasks/@component/users";
import { sql } from "@/app/sql";
import crypto from "crypto";
import { NextRequest } from "next/server";
import redis from "@/app/redis";

export async function POST(req: NextRequest) {
	const data = await req.formData();
	const cookie = cookies();
	const user = await getUserByToken(sql, cookie.get("cc")?.value, cookie.get("ct")?.value);

	if (!user) {
		return new Response("Unauthorized", {
			status: 401
		});
	}

	const url = req.nextUrl.clone();
	url.port = "443";

	if (!data.has("type")) {
		return new Response("Bad Request", {
			status: 400
		});
	}

	if (data.get("type") == "update") {
		await sql.query("UPDATE users SET grade = ?, name = ? WHERE id = ?", [data.get("grade"), JSON.stringify([data.get("name1"), data.get("name2"), data.get("name3")].filter(Boolean)), user.id]);
		url.pathname = "/account/settings";
		url.searchParams.set("error", "0");
		redis.del("user:" + user.id);
		redis.del("user:token:" + cookie.get("cc")?.value + ":" + cookie.get("ct")?.value);
		return Response.redirect(url);
	} else if (data.get("type") == "password") {

		if (!data.has("current_password")) {
			return new Response("Bad Request", {
				status: 400
			});
		}

		if (!data.has("new_password") || !data.has("new_password2")) {
			return new Response("Bad Request", {
				status: 400
			});
		}

		const hashedPassword = crypto.createHash("sha256").update(data.get("current_password")!! as string).digest("hex");
		if (user.password != hashedPassword) {
			url.pathname = "/account/settings";
			url.searchParams.set("error", "1");
			return Response.redirect(url);
		}

		const hashedNewPassword = crypto.createHash("sha256").update(data.get("new_password")!! as string).digest("hex");
		const hashedNewPassword2 = crypto.createHash("sha256").update(data.get("new_password2")!! as string).digest("hex");
		if (hashedNewPassword != hashedNewPassword2) {
			url.pathname = "/account/settings";
			url.searchParams.set("error", "2");
			return Response.redirect(url);
		}

		const req = { body: { password: hashedNewPassword } };

		if (
			!req.body.password ||
			(req.body.password as string).length < 8 ||
			(req.body.password as string).length > 255 ||
			(req.body.password as string).match(/^[0-9]*$/) ||
			(req.body.password as string).match(/^[a-zA-Z]*$/)
		) {
			return new Response("Bad Request: Invalid password", {
				status: 400
			});
		}

		await sql.query("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, user.id]);
		url.pathname = "/account/settings";
		url.searchParams.set("error", "0");
		redis.del("user:" + user.id);
		redis.del("user:token:" + cookie.get("cc")?.value + ":" + cookie.get("ct")?.value);
		return Response.redirect(url);
	} else {
		return new Response("Bad Request", {
			status: 400
		});
	}
}