import { sql } from "@/app/sql";
import { cookies } from "next/headers";

export interface Contest {

	id: string;
	name: string;
	problems: string[];

	public: boolean;

	editor: string[];
	tester: string[];

	rated: string;

	start: number;
	period: number;

}

export default async function Page() {

	const ct_token = crypto.randomUUID();
	await sql.query("INSERT INTO ct_token (id, use_to) VALUES (?, 'LOGIN')", [ct_token]);

	const level_flash = cookies().get("LEVEL_FLASH")?.value;

	return (
		<>
			<h1>Login | Atsuo Coder</h1>
			<p>{level_flash}</p>
			<form action="/login" method="post">
				<input type="text" name="id" placeholder="ID" required /><br />
				<input type="password" name="password" placeholder="Password" required /><br />
				<input type="hidden" name="ct_token" value={ct_token} required />
				<input type="submit" value="Login" />
			</form>
		</>
	);

}
