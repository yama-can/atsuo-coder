import { sql } from "@/app/sql";
import { getUserByToken } from "../../tasks/@component/users";
import { cookies } from "next/headers";
import redis from "@/app/redis";
import { redirect } from "next/navigation";

export default async function GET({ params: { contest } }: { params: { contest: string } }) {

	const sqlResult = (await sql.query("SELECT rated_users, unrated_users FROM contests WHERE id = ?", [contest]) as any)[0][0];

	let rated_users = JSON.parse(sqlResult.rated_users) as string[];
	let unrated_users = JSON.parse(sqlResult.unrated_users) as string[];
	const cookie = cookies();
	const user = await getUserByToken(sql, cookie.get("cc")?.value, cookie.get("ct")?.value);

	if (!user) {
		return redirect("/login");
	}

	let change = false;

	if (rated_users.includes(user.id)) {
		rated_users = rated_users.filter((v) => v != user.id);
		change = true;
	}

	if (unrated_users.includes(user.id)) {
		unrated_users = unrated_users.filter((v) => v != user.id);
		change = true;
	}

	if (change) {

		await sql.query("UPDATE contests SET rated_users = ?, unrated_users = ? WHERE id = ?", [JSON.stringify(rated_users), JSON.stringify(unrated_users), contest]);

	}

	await redis.del(`contest:${contest}`);

	return redirect(`/contests/${contest}`);

}