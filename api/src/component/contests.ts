import { Connection } from "mysql2/promise";

export interface Contest {

	id: string;
	name: string;
	problems: string[];

	public: boolean;

	editor: string[];
	tester: string[];

	start: number;
	period: number;

}

export type Contests = Contest[];

export async function getContests(sql: Connection, userId?: string) {

	return new Promise<Contests>(async (resolve) => {

		const data = await sql.query("SELECT * from contests where public = 1 OR LOCATE(?, editor) > 0 OR LOCATE(?, tester) > 0;", [`"${userId}"`, `"${userId}"`]);

		resolve(
			(data[0] as any[]).map((data: any) => {

				return { ...data, problems: JSON.parse(data.problems), editor: JSON.parse(data.editor), tester: JSON.parse(data.tester), start: new Date(data.start).getTime() };

			})
		);

	})

}

export async function getContest(sql: Connection, id: string, showPublic = false) {

	return new Promise<Contests>(async (resolve) => {

		const data = await sql.query("SELECT * from contests where id = ? AND public = ?;", [id, showPublic]);

		resolve(
			(data[0] as any[]).map((data: any) => {

				return { ...data, problems: JSON.parse(data.problems), editor: JSON.parse(data.editor), tester: JSON.parse(data.tester), start: new Date(data.start).getTime() };

			})
		);

	})

}
