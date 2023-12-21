import { Connection } from "mysql2/promise";
import { Contest } from "./Contest";
import redis from "@/app/redis";

export type Contests = Contest[];

export async function getContests(sql: Connection, userId?: string) {

	return new Promise<Contests>(async (resolve) => {

		const cache = await redis.get(`contests:${userId}`);
		if (cache != null) {
			const data = JSON.parse(cache);
			resolve(data);
			return;
		}

		const data = await sql.query("SELECT * from contests where public = 1 OR LOCATE(?, editor) > 0 OR LOCATE(?, tester) > 0 ORDER BY start ASC;", [`"${userId}"`, `"${userId}"`]);

		const res = (
			(data[0] as any[]).map((data: any) => {

				return { ...data, problems: JSON.parse(data.problems), editor: JSON.parse(data.editor), tester: JSON.parse(data.tester), start: new Date(data.start).getTime(), rated_users: JSON.parse(data.rated_users), unrated_users: JSON.parse(data.unrated_users) };

			})
		);

		if (res.length != 0) {
			await redis.set(`contests:${userId}`, JSON.stringify(res));
			await redis.expire(`contests:${userId}`, 60 * 60);
		}

		resolve(res);

	})

}

export async function getContest(sql: Connection, id: string, userId?: string) {

	return new Promise<Contests>(async (resolve) => {

		const cache = await redis.get(`contest:${id}`);
		if (cache != null) {
			const data = JSON.parse(cache);
			if (data[0].public || Array.from(data[0].editor).indexOf(userId) != -1 || Array.from(data[0].tester).indexOf(userId) != -1) {
				resolve(data);
			} else {
				resolve([]);
			}
			return;
		}

		const data = await sql.query(`SELECT * from contests where id = ? AND ( public = 1 ${!userId ? "" : " OR LOCATE(?, editor) > 0 OR LOCATE(?, tester) > 0"} ) ORDER BY start ASC;`, [id, userId, userId]);

		const res = (
			(data[0] as any[]).map((data: any) => {

				return { ...data, problems: JSON.parse(data.problems), editor: JSON.parse(data.editor), tester: JSON.parse(data.tester), start: new Date(data.start).getTime(), rated_users: JSON.parse(data.rated_users), unrated_users: JSON.parse(data.unrated_users) };

			})
		);

		if (res.length != 0) {
			await redis.set(`contest:${id}`, JSON.stringify(res));
			await redis.expire(`contest:${id}`, 60 * 60);
		}

		resolve(res);

	})

}
