import { sql } from "@/app/sql";
import styles from "./[id]/submission.module.css";
import { FieldPacket } from "mysql2";
import { getUserByToken } from "../tasks/@component/users";
import { cookies } from "next/headers";
import { getContest } from "../contests";
import notFound from "@/app/not-found";

export default async function Submissions({ params }: { params: { [key: string]: string } }) {

	const cookie = cookies();
	const user = await getUserByToken(sql, cookie.get("cc")?.value, cookie.get("ct")?.value) || { id: undefined };

	if (!user.id) {
		notFound();
	}

	const resultStrings = ["AC", "WA", "RE", "CE", "TLE", "OLE", "MLE", "QLE", "IE"];

	const contest = await getContest(sql, params.contest);

	if (contest[0].start + contest[0].period > Date.now()) {
		if (!user.id) notFound();
		if (contest[0].editor.indexOf(user.id!!) == -1 && contest[0].tester.indexOf(user.id!!) == -1 && contest[0].rated_users.indexOf(user.id!!) == -1 && contest[0].unrated_users.indexOf(user.id!!) == -1) {
			notFound();
		}
	}

	const submissions = await (async () => {
		if (contest[0].editor.includes(user.id!!) || contest[0].tester.includes(user.id!!)) {
			return (await sql.query("SELECT id, task, user, created_at, judge, language FROM submissions WHERE contest = ? ORDER BY created_at DESC", [params.contest]) as [{ id: string, task: string, created_at: Date, judge: string, language: string, user: string }[], FieldPacket[]])[0];
		} else {
			return (await sql.query("SELECT id, task, user, created_at, judge, language FROM submissions WHERE contest = ? AND user = ? ORDER BY created_at DESC", [params.contest, user.id]) as [{ id: string, task: string, created_at: Date, judge: string, language: string, user: string }[], FieldPacket[]])[0];
		}
	})();

	return (
		<>
			<h1>提出一覧 | AtsuoCoder</h1>
			<div>
				<input type="button" value="Reload" id="reload" />
			</div>
			<h2>Submissions</h2>
			<table>
				<thead>
					<tr>
						<td width="5%">#</td>
						<td width="20%">Time</td>
						<td width="20%">User</td>
						<td width="35%">Task</td>
						<td width="10%">Judge</td>
						<td width="10%">Detail</td>
					</tr>
				</thead>
				<tbody id="submissions">
					{
						submissions.map((submission, i) => {
							const result = submission.judge == "WJ" ? "WJ" : JSON.parse(submission.judge).status == 3 ? "CE" : resultStrings[JSON.parse(submission.judge)[0][0]];
							return <tr>
								<td>{submissions.length - i}</td>
								<td>{submission.created_at.toLocaleString("ja")}</td>
								<td>{submission.user}</td>
								<td><a href={`/contests/${params.contest}/tasks/${submission.task}`}>{submission.task}</a></td>
								<td><p className={styles[`c-${result.toLowerCase()}`]}>{result}</p></td>
								<td><a href={`/contests/${params.contest}/submissions/${submission.id}`}>Detail</a></td>
							</tr>
						})
					}
				</tbody>
			</table>
		</>
	);
}