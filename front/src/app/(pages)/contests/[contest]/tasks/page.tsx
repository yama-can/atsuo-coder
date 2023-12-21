import { cookies } from 'next/headers'
import { sql } from "@/app/sql";
import { getContest } from "../contests";
import { notFound } from "next/navigation";
import { getUserByToken } from './@component/users';
import { getTasks } from './@component/contests';
import dynamic from 'next/dynamic';

export default async function Home(p: { params: { contest: string } }) {

	let user = undefined;
	const cookie = cookies();
	if (cookie.get("cc") && cookie.get("ct")) {
		user = await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value);
	}

	const contestInfo = await getContest(sql, p.params.contest, user?.id);
	if (contestInfo.length == 0) notFound();
	const tasks = await getTasks(sql, contestInfo[0].problems);

	if (contestInfo[0].start + contestInfo[0].period > Date.now()) {
		if (!user) notFound();
		if (contestInfo[0].editor.indexOf(user!!.id) == -1 && contestInfo[0].tester.indexOf(user!!.id) == -1 && contestInfo[0].rated_users.indexOf(user!!.id) == -1 && contestInfo[0].unrated_users.indexOf(user!!.id) == -1) {
			notFound();
		}
	}

	if (contestInfo.length == 0) {
		notFound();
	}

	return (
		<>
			<h1>{contestInfo[0].name}</h1>
			<p>
				Editor: {contestInfo[0].editor} Tester: {contestInfo[0].tester.length == 0 ? "なし" : contestInfo[0].tester} Rated: {contestInfo[0].rated || "無制限"}<br />
				開始: {new Date(contestInfo[0].start).toLocaleString("ja")}<br />
				終了: {new Date(contestInfo[0].start + contestInfo[0].period).toLocaleString("ja")}<br />
				種別: {contestInfo[0].public ? "公開" : "非公開"}
			</p>

			{
				contestInfo[0].editor.indexOf(user?.id || "undefined") != -1 || contestInfo[0].tester.indexOf(user?.id || "undefined") != -1 || contestInfo[0].start <= Date.now() ?
					<>
						<h2>問題</h2>
						<table>
							<thead>
								<tr>
									<td>問題</td>
									<td>点数</td>
									<td>Editor</td>
								</tr>
							</thead>
							<tbody>
								{contestInfo[0].problems.map((v, i) => {
									const task = tasks.find((t) => t.id == v);
									return <>
										<tr>
											<td>
												<a href={`/contests/${p.params.contest}/tasks/${task!!.id}`}>{task!!.name}</a>
											</td>
											<td>
												{task!!.score}
											</td>
											<td>
												{task!!.editor}
											</td>
										</tr>
									</>;
								})}
							</tbody>
						</table>
					</>
					: <>
						<p>コンテストはまだ始まっていません。</p>
					</>
			}
		</>
	)

}
