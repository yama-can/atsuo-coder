import { sql } from "@/app/sql";
import { getContest } from "./contests";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { marked } from "marked";
import parse from 'html-react-parser';
import { cookies } from "next/headers";
import { getUserByToken } from "./tasks/@component/users";

export default async function Home(p: { params: { contest: string } }) {

	let user = undefined;
	const cookie = cookies();
	if (cookie.get("cc") && cookie.get("ct")) {
		user = await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value);
	}

	const contestInfo = await getContest(sql, p.params.contest, user?.id);

	if (contestInfo.length == 0) {
		notFound();
	}

	const Mathjax = dynamic(() => import("./tasks/[task]/mathjax"), {
		ssr: false
	});

	return (
		<>
			<h1>{contestInfo[0].name}</h1>
			<p>
				Editor: {contestInfo[0].editor} Tester: {contestInfo[0].tester.length == 0 ? "なし" : contestInfo[0].tester} Rated: {contestInfo[0].rated || "無制限"}<br />
				開始: {new Date(contestInfo[0].start).toLocaleString("ja")}<br />
				種別: {contestInfo[0].public ? "公開" : "非公開"}
			</p>

			<div id="description">
				<Mathjax>
					<div id="description">
						{parse(marked(contestInfo[0].description))}
					</div>
				</Mathjax>
			</div>
		</>
	)

}
