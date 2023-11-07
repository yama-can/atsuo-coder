import { Connection, Field, FieldPacket, RowDataPacket } from "mysql2/promise";
import crypto from "crypto";

export interface User {

	id: string;

	name: [string] | [string, string] | [string, string, string];
	grade: number;

	rating: number;

	// SHA256 hashed password
	password: string;

}

export type Users = User[];

export async function getUsers(sql: Connection) {

	return new Promise<Users>(async (resolve) => {

		const data = await sql.query("SELECT * from users;");

		resolve(
			(data[0] as any[]).map((data: any) => {

				return { ...data, name: JSON.parse(data.name) };

			})
		);

	})

}

export async function getUser(sql: Connection, id: string) {

	return new Promise<User>(async (resolve) => {

		const data = await sql.query("SELECT * from users where id = ?;", [id]);

		resolve(
			(data[0] as any[]).map((data: any) => {

				return { ...data[0][0], name: JSON.parse(data[0][0].name) };

			})[0]
		);

	})

}

export async function getUserByToken(sql: Connection, token: string, ct: string) {

	return new Promise<User>(async (resolve) => {

		const [tokens] = await sql.query("SELECT * from tokens where token = ? AND ct = ?;", [token, ct]) as [RowDataPacket[], FieldPacket[]];


		resolve(await getUser(sql, tokens[0].id));
	});
}

export async function login(sql: Connection, userId: string) {

	return new Promise<{ token: string, ct: string }>(async (resolve) => {

		let token = crypto.randomUUID(), ct = crypto.randomUUID();

		await sql.query("INSERT INTO tokens (id, token, ct) VALUES (?, ?, ?);", [userId, token, ct]);

		resolve({ token, ct });

	});

}
