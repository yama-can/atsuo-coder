import { Connection } from "mysql2/promise";
import { Contest, Task } from "./Contest";

export type Tasks = Task[];

export async function getTasks(sql: Connection, userId?: string) {

	return new Promise<Tasks>(async (resolve) => {

		const data = await sql.query("SELECT * from tasks where LOCATE(?, editor) > 0 OR LOCATE(?, tester) > 0 ORDER BY start ASC;", [`"${userId}"`, `"${userId}"`]);

		resolve(
			(data[0] as any[]).map((data: any) => {

				return { ...data, editor: JSON.parse(data.editor), tester: JSON.parse(data.tester) };

			})
		);

	})

}

export async function getTask(sql: Connection, id: string) {

	return new Promise<Tasks>(async (resolve) => {

		const data = await sql.query(`SELECT * from tasks where id = ?;`, [id]);

		resolve(
			(data[0] as any[]).map((data: any) => {

				return { ...data, editor: JSON.parse(data.editor), tester: JSON.parse(data.tester) };

			})
		);

	})

}
