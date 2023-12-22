import { sql } from "@/app/sql";
import { getContest } from "../contests";
import { getUserByToken } from "../tasks/@component/users";
import { cookies } from "next/headers";
import styles from "./standings.module.css";
import { FieldPacket } from "mysql2";
import { notFound } from "next/navigation";

export default async function Standings({ params: { contest: contestId } }: { params: { contest: string } }) {

	const cookie = cookies();
	const user = (!cookie.has("cc") && !cookie.has("ct") ? null : await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value));
	const contest = await getContest(sql, contestId, (user || { id: undefined }).id);

	if (contest.length == 0) notFound();

	const [submissions, _] = await sql.query("SELECT * FROM submissions WHERE contest = ? ORDER BY created_at", [contestId]) as [{ id: string, sourceCode: string, contest: string, task: string, user: string, created_at: Date, judge: string, language: string }[], FieldPacket[]];

	const scores: { [user: string]: { score: number, problems: { [problem: string]: number } } } = {};

	for (let i = 0; i < submissions.length; i++) {
		if (submissions[i].judge == "WJ" || JSON.parse(submissions[i].judge).status == 3) continue;
		scores[submissions[i].user] = scores[submissions[i].user] || { score: 0, problems: {} };
		scores[submissions[i].user].problems[submissions[i].task] = Math.max(scores[submissions[i].user].problems[submissions[i].task] || 0, JSON.parse(submissions[i].judge)[0][1]);
	}

	const users: [number, string][] = [];
	for (const user in scores) {
		for (const problem in scores[user].problems) {
			scores[user].score += scores[user].problems[problem];
		}
		users.push([scores[user].score, user]);
	}

	users.sort((a, b) => b[0] - a[0]);

	return (
		<>
			<h1>Standings | AtsuoCoder</h1>
			<table>
				<thead>
					<tr>
						<td className={styles.user}>User</td>
						<td className={styles.user}>Total</td>
						{
							contest[0].problems.map((problem, i) => {
								return (
									<td key={i}><a href={`/contests/${contestId}/tasks/${problem}`}>{problem}</a></td>
								)
							})
						}
					</tr>
				</thead>
				<tbody>
					{
						users.map((user, i) => {
							return (
								<tr key={i}>
									<td className={styles.user}>{user[1]}</td>
									<td className={styles.user}>{scores[user[1]].score}</td>
									{
										contest[0].problems.map((problem, j) => {
											return (
												<td key={j}>{scores[user[1]].problems[problem] || 0}</td>
											)
										})
									}
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</>
	)

}