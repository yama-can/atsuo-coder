import { sql } from "@/app/sql";
import { getContest } from "./contests";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { marked } from "marked";
import parse from 'html-react-parser';
import { cookies } from "next/headers";
import { getUserByToken } from "./tasks/@component/users";
import styles from "./page.module.css";

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
			<div className={styles.contest_title}>
				<h1>{contestInfo[0].name}</h1>
				<ul>
					<a href={void(0)} className={styles.rated_button}>Rated登録</a>
					<a href={void(0)} className={styles.unrated_button}>Unrated登録</a>
				</ul>
				<p>
					Editor: {contestInfo[0].editor} | Tester: {contestInfo[0].tester.length == 0 ? "None" : contestInfo[0].tester}<br />
					Rated: {contestInfo[0].rated || "無制限"} | Start: {new Date(contestInfo[0].start).toLocaleString("ja")} | End: {new Date(contestInfo[0].start + contestInfo[0].period).toLocaleString("ja")} | Type: {contestInfo[0].public ? "Public" : "Private"}
				</p>
			</div>

			<br />

			<div id="description" className={styles.description}>
				<Mathjax>
					<div id="description">
						{parse(marked(contestInfo[0].description))}
					</div>
				</Mathjax>
			</div>
		</>
	)

}
