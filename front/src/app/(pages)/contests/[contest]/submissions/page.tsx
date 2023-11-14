"use client";
import { useEffect } from "react";
import styles from "./[id]/submission.module.css";

export default function Submissions({ params }: { params: { [key: string]: string } }) {
	useEffect(() => {
		if ("once" in global) return;
		(global as any).once = true;

		(async () => {
			(global as any).me = await (await fetch("/login/me")).text();
			const check = await (await fetch(`/submissions/check/${params.contest}`)).text();
			if (check == "OK") {
				(document.querySelector("input#checkbox") as HTMLInputElement).disabled = false;
			}

			const resultStrings = ["AC", "WA", "RE", "CE", "TLE", "OLE", "MLE", "QLE", "IE"];

			(global as any).cacheMe = await (await fetch(`/submissions/json?contest=${params.contest}&user=${(global as any).me}`)).json();
			((global as any).cacheMe as { id: string, task: string, created_at: Date, judge: string, language: string }[]).forEach((v, i) => {
				const row = (document.querySelector("#submissions") as HTMLTableSectionElement).insertRow();
				row.insertCell().innerText = ((global as any).cacheMe.length - i).toString();
				row.insertCell().innerText = new Date(v.created_at).toLocaleString("ja");
				row.insertCell().innerText = (global as any).me;
				row.insertCell().innerHTML = `<a href="/contests/${params.contest}/tasks/${v.task}">${v.task}</a>`;
				if (v.judge == "WJ") {
					row.insertCell().innerHTML = `<p class="${styles["c-wj"]}">WJ</p>`
				} else if (JSON.parse(v.judge).status == 3) {
					row.insertCell().innerHTML = `<p class="${styles["c-ce"]}">CE</p>`
				} else {
					const judge = JSON.parse(v.judge);
					const result = resultStrings[judge[0][0]];
					row.insertCell().innerHTML = `<p class="${styles[`c-${result.toLowerCase()}`]}">${result}</p>`;
				}
				row.insertCell().innerHTML = `<a href="/contests/${params.contest}/submissions/${v.id}">詳細</a>`;
			})
		})();
	})

	return (
		<>
			<h1>提出一覧 | AtsuoCoder</h1>
			<h2>Settings</h2>
			<div className={styles.onlyme}>
				<label htmlFor="onlyme">Only Yours: </label>
				<input type="checkbox" id="onlyme" disabled defaultChecked />
			</div>
			<h2>Submissions</h2>
			<table>
				<thead>
					<tr>
						<td width="5%">#</td>
						<td width="20%">時間</td>
						<td width="20%">User</td>
						<td width="35%">Task</td>
						<td width="10%">Judge</td>
						<td width="10%">詳細</td>
					</tr>
				</thead>
				<tbody id="submissions"></tbody>
			</table>
		</>
	);
}