"use client";

import { useEffect } from "react";

export default function Page() {

	useEffect(() => {
		const infCon = (document.querySelector("table#inf-con tbody") as HTMLTableSectionElement);
		
	})

	return (
		<>
			<h1>Contests</h1>
			<p>コンテスト一覧です</p>

			<h2>常設中のコンテスト</h2>

			<div className="scroll">
				<table id="inf-con">
					<thead>
						<tr>
							<td width="10%">開始時間</td>
							<td width="5%">種別</td>
							<td width="70%">コンテスト名</td>
							<td width="10%">レーティング対象</td>
							<td width="5%">長さ</td>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>
		</>
	)
}
