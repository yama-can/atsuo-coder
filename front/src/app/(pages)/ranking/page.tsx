"use client";

import { useEffect } from "react";

export default function Ranking() {
	useEffect(() => {
		if("once" in global) return;
		(async () => {
			(global as any).once = true;
			const table = document.querySelector("#data") as HTMLTableElement;
			const data = await fetch("/ranking/json").then((res) => res.json()) as { rating: number, id: string, name: string[], grade: string }[];
			data.forEach((v, i) => {
				const row = table.insertRow();
				const rank = row.insertCell();
				const id = row.insertCell();
				const rating = row.insertCell();
				const name = row.insertCell();
				const grade = row.insertCell();
				rank.innerText = `${i + 1}`;
				rating.innerText = `${v.rating}`;
				const link = document.createElement("a");
				link.innerText = v.id;
				link.href = `/users/${v.id}`;
				id.appendChild(link);
				name.innerText = v.name.join(" ");
				grade.innerText = v.grade;
			});
		})();
	});

	return (
		<>
			<h1>Ranking | Atsuo Coder</h1>
			<table>
				<thead>
					<tr>
						<td>Rank</td>
						<td>ID</td>
						<td>Rating</td>
						<td>Name</td>
						<td>Grade</td>
					</tr>
				</thead>
				<tbody id="data"></tbody>
			</table>
		</>
	)
}
