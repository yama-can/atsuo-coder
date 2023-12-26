import { sql } from "@/app/sql"
import { cookies } from "next/headers";
import { getContest } from "../../contests";
import { getUserByToken } from "../../tasks/@component/users";
import submissionsStyle from "./submission.module.css";
import { notFound } from "next/navigation";
import { getTask } from "../../task";

export default async function Home(params: { params: { [key: string]: string } }) {
	const cookie = cookies();

	if (!cookie.has("cc") || !cookie.has("ct")) {
		notFound();
	}

	const user = await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value);
	const contest = await getContest(sql, params.params.contest, user?.id);
	if (contest.length == 0) {
		notFound();
	}

	let allowUser = true;

	if (contest[0].start + contest[0].period > Date.now()) {
		allowUser = false;
	}

	if (user) {
		if (contest[0].editor.includes(user.id) || contest[0].tester.includes(user.id)) {
			allowUser = true;
		}
	}

	const result = await sql.query(`SELECT sourceCode, judge, task from submissions WHERE id = ? ${allowUser ? "" : "AND user = ?"}`, [params.params.id, user?.id]);

	if (Array.from(result[0] as any).length == 0) {
		notFound();
	}

	const { sourceCode, judge, task } = Array.from(result[0] as any)[0] as any;

	const taskInfo = await getTask(sql, task);

	const parsedJudge = judge == "WJ" ? {} : JSON.parse(judge);

	const resultStrings = ["AC", "WA", "RE", "CE", "TLE", "OLE", "MLE", "QLE", "IE"];

	return (
		<>
			<title>提出 | Atsuo Coder</title>
			<h1>提出 | Atsuo Coder</h1>
			<br />
			<div className={submissionsStyle.root}>
				<h2>Code</h2>
				<iframe src={`/frame/ace-editor?sourceCode=${encodeURIComponent(sourceCode)}&readonly=true`} id="ace-editor" className={submissionsStyle.reader}></iframe>
				<br />
				<div className={submissionsStyle.grid}>
					<div>
						<h2>Task</h2>
						<a href={`/contests/${params.params.contest}/tasks/${task}`}>{taskInfo[0].name}</a>
					</div>
					<div>
						<h2>Result</h2>
						{
							judge == "WJ" ?
								<p>Waiting Judge</p> :
								"status" in parsedJudge ?
									<><p className={submissionsStyle[`c-${resultStrings[parsedJudge.status].toLowerCase()}`]}>{resultStrings[parsedJudge.status]}</p><br /><code>{parsedJudge.message}</code></> :
									<>
										<p>
											<span className={submissionsStyle[`c-${resultStrings[parsedJudge[0][0]].toLowerCase()}`]}>{resultStrings[parsedJudge[0][0]]}</span>
										</p>
										<p>{parsedJudge[0][1]} points</p>
									</>
						}
					</div>
				</div>
				<br />
				<h2>Testcases</h2>
				<br />
				{
					judge != "WJ" && parsedJudge.status != 3 ?
						<table>
							<thead>
								<tr>
									<td>Testcase ID</td>
									<td>Result</td>
									<td>Score</td>
									<td>Detail</td>
								</tr>
							</thead>
							<tbody>
								{
									(parsedJudge[1] as [number, number][]).map((v, i) => {
										const judgeDetails: { [result: number]: number } = [];
										let results: number[] = [];
										parsedJudge[2][i].forEach((v: [number, number]) => {
											if (v[0] in judgeDetails) {
												judgeDetails[v[0]]++;
											} else {
												judgeDetails[v[0]] = 1;
												results.push(v[0]);
											}
										});
										results.sort();
										return <tr key={i}>
											<td>{i + 1}</td>
											<td>
												<div className={submissionsStyle[`c-${resultStrings[v[0]].toLowerCase()}`]}>
													{resultStrings[v[0]]}
												</div>
											</td>
											<td>{v[1]} points</td>
											<td>
												{
													results.map((result, i) => {
														return (
															<span key={i} className={submissionsStyle.detailResult}>
																<div className={submissionsStyle[`c-${resultStrings[result].toLowerCase()}`]}>
																	{resultStrings[result]}
																</div> × {judgeDetails[result]}
															</span>
														)
													})
												}
											</td>
										</tr>
									})
								}
							</tbody>
						</table>
						: <></>
				}
			</div>
		</>
	)
}