"use client";

import { useEffect } from "react";

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

export default function Page(params: { searchParams: { [key: string]: string } }) {
	useEffect(() => {

		const infCon = (document.querySelector("table#inf-con tbody") as HTMLTableSectionElement);
		const nowCon = (document.querySelector("table#now-con tbody") as HTMLTableSectionElement);
		const befCon = (document.querySelector("table#bef-con tbody") as HTMLTableSectionElement);
		const aftCon = (document.querySelector("table#aft-con tbody") as HTMLTableSectionElement);

		(async () => {

			if (!("once" in global)) {
				(global as any).once = true;
			} else {
				return;
			}

			const contests = await fetch("/contests/json").then((res) => res.json());

			const time = new Date().getTime();

			contests.forEach((value: Contest) => {

				const child = document.createElement("tr");
				const start = document.createElement("td");
				const type = document.createElement("td");
				const name = document.createElement("td");
				const rated = document.createElement("td");
				const period = document.createElement("td");

				const link = document.createElement("a");

				link.href = `/contests/${value.id}`;

				start.innerText = new Date(value.start).toLocaleString("ja");
				type.innerText = value.public ? "公開" : "非公開";
				name.innerText = value.name;
				rated.innerText = value.rated || "無制限";
				period.innerText = new Date(value.period).toLocaleTimeString("ja");

				link.appendChild(name);

				child.appendChild(start);
				child.appendChild(type);
				child.appendChild(link);
				child.appendChild(rated);
				child.appendChild(period);

				if (value.period == -1) {
					start.innerText = "常設";
					period.innerText = "常設";
					infCon.appendChild(child);
				}
				else if (value.start >= time && value.start + value.period <= time) {
					nowCon.appendChild(child);
				}
				else if (value.start >= time) {
					aftCon.appendChild(child);
				}
				else {
					befCon.appendChild(child);
				}
			})
		})();

	})

	return (
		<>
			<h1>Contests</h1>
			<p>コンテスト一覧です</p>

			<h2>常設中のコンテスト</h2>

			<div>
				<table id="inf-con">
					<thead>
						<tr>
							<td width="20%">開始時間</td>
							<td width="10%">種別</td>
							<td width="50%">コンテスト名</td>
							<td width="10%">Reated</td>
							<td width="10%">長さ</td>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>

			<h2>現在開催されているコンテスト</h2>

			<div>
				<table id="now-con">
					<thead>
						<tr>
							<td width="20%">開始時間</td>
							<td width="10%">種別</td>
							<td width="50%">コンテスト名</td>
							<td width="10%">Reated</td>
							<td width="10%">長さ</td>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>

			<h2>開催前のコンテスト</h2>

			<div>
				<table id="bef-con">
					<thead>
						<tr>
							<td width="20%">開始時間</td>
							<td width="10%">種別</td>
							<td width="50%">コンテスト名</td>
							<td width="10%">Reated</td>
							<td width="10%">長さ</td>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>

			<h2>開催後のコンテスト</h2>

			<div>
				<table id="aft-con">
					<thead>
						<tr>
							<td width="20%">開始時間</td>
							<td width="10%">種別</td>
							<td width="50%">コンテスト名</td>
							<td width="10%">Reated</td>
							<td width="10%">長さ</td>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>
		</>
	)
}
