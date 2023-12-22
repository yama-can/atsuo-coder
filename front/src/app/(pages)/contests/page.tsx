import { getContests } from "./[contest]/contests";
import { User, getUserByToken } from "./[contest]/tasks/@component/users";
import { cookies } from "next/headers";
import { sql } from "@/app/sql";

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

export default async function Page(params: { searchParams: { [key: string]: string } }) {

	const cookie = cookies();
	const user = (!cookie.has("ct") && !cookie.has("cc") ? null : await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value)) || { id: undefined };
	const contests = await getContests(sql, user.id);

	return (
		<>
			<h1>Contests</h1>
			<p>コンテスト一覧です</p>

			<h2>Permanent Contests</h2>

			<div>
				<table id="inf-con">
					<thead>
						<tr>
							<td width="20%">Start</td>
							<td width="10%">Type</td>
							<td width="50%">Contest Name</td>
							<td width="10%">Rated</td>
							<td width="10%">Period</td>
						</tr>
					</thead>
					<tbody>
						{
							contests.filter((contest) => contest.period == -1).map((contest, i) => {
								return <tr key={i}>
									<td>{new Date(contest.start).toLocaleString("ja")}</td>
									<td>{contest.public ? "公開" : "非公開"}</td>
									<td><a href={`/contests/${contest.id}`}>{contest.name}</a></td>
									<td>{contest.name}</td>
									<td>{contest.rated}</td>
									<td>inf</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>

			<h2>Active Contests</h2>

			<div>
				<table id="now-con">
					<thead>
						<tr>
							<td width="20%">Start</td>
							<td width="10%">Type</td>
							<td width="50%">Contest Name</td>
							<td width="10%">Rated</td>
							<td width="10%">Period</td>
						</tr>
					</thead>
					<tbody>
						{
							contests.filter((contest) => contest.start <= Date.now() && contest.start + contest.period >= Date.now()).map((contest, i) => {
								return <tr key={i}>
									<td>{new Date(contest.start).toLocaleString("ja")}</td>
									<td>{contest.public ? "公開" : "非公開"}</td>
									<td><a href={`/contests/${contest.id}`}>{contest.name}</a></td>
									<td>{contest.rated}</td>
									<td>{`${Math.floor((contest.period - (contest.period - contest.period % 60) % 3600) / 3600)}:${Math.floor(((contest.period - contest.period % 60) % 3600) / 60)}:${contest.period % 60}`}</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>

			<h2>Upcoming Contests</h2>

			<div>
				<table id="bef-con">
					<thead>
						<tr>
							<td width="20%">Start</td>
							<td width="10%">Type</td>
							<td width="50%">Contest Name</td>
							<td width="10%">Rated</td>
							<td width="10%">Period</td>
						</tr>
					</thead>
					<tbody>
						{
							contests.filter((contest) => contest.start > Date.now()).map((contest, i) => {
								return <tr key={i}>
									<td>{new Date(contest.start).toLocaleString("ja")}</td>
									<td>{contest.public ? "公開" : "非公開"}</td>
									<td><a href={`/contests/${contest.id}`}>{contest.name}</a></td>
									<td>{contest.rated}</td>
									<td>{`${Math.floor((contest.period - (contest.period - contest.period % 60) % 3600) / 3600)}:${Math.floor(((contest.period - contest.period % 60) % 3600) / 60)}:${contest.period % 60}`}</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>

			<h2>Recent Contests</h2>

			<div>
				<table id="aft-con">
					<thead>
						<tr>
							<td width="20%">Start</td>
							<td width="10%">Type</td>
							<td width="50%">Contest Name</td>
							<td width="10%">Rated</td>
							<td width="10%">Period</td>
						</tr>
					</thead>
					<tbody>
						{
							contests.filter((contest) => contest.start + contest.period < Date.now()).map((contest, i) => {
								return <tr key={i}>
									<td>{new Date(contest.start).toLocaleString("ja")}</td>
									<td>{contest.public ? "公開" : "非公開"}</td>
									<td><a href={`/contests/${contest.id}`}>{contest.name}</a></td>
									<td>{contest.rated}</td>
									<td>{`${Math.floor((contest.period - (contest.period - contest.period % 60) % 3600) / 3600)}:${Math.floor(((contest.period - contest.period % 60) % 3600) / 60)}:${contest.period % 60}`}</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
		</>
	)
}
