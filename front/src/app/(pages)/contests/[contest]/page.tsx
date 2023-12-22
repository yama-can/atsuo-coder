import { sql } from "@/app/sql";
import { getContest } from "./contests";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { marked } from "marked";
import parse from 'html-react-parser';
import { cookies } from "next/headers";
import { User, getUserByToken } from "./tasks/@component/users";
import styles from "./page.module.css";

export default async function Home(p: { params: { contest: string } }) {

	let user: User | null = null;
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

	const sqlResult = (await sql.query("SELECT rated_users, unrated_users FROM contests WHERE id = ?", [p.params.contest]) as any)[0][0] as { rated_users: string, unrated_users: string };
	const rated_users = JSON.parse(sqlResult.rated_users);
	const unrated_users = JSON.parse(sqlResult.unrated_users);

	const isRated = user ? rated_users.includes(user.id) : false;
	const isUnrated = user ? unrated_users.includes(user.id) : false;

	return (
		<>

			<div className={styles.contest_title}>
				<h1>{contestInfo[0].name}</h1>
				{!user || contestInfo[0].start <= Date.now() ? <></> :
					<ul>
						{isRated ? <></> : <a href={`/contests/${p.params.contest}/register/rated`} className={styles.rated_button}>{isUnrated ? "Rated登録に変更" : "Rated登録"}</a>}
						{isUnrated ? <></> : <a href={`/contests/${p.params.contest}/register/unrated`} className={styles.unrated_button}>{isRated ? "Unrated登録に変更" : "Unrated登録"}</a>}
						{isRated || isUnrated ? <a href={`/contests/${p.params.contest}/register/cancel`} className={styles.cancel_button}>登録解除</a> : <></>}
					</ul>
				}
				<p>
					Editor: {contestInfo[0].editor.join(' ')} | Tester: {contestInfo[0].tester.length == 0 ? "None" : contestInfo[0].tester.join(' ')}<br />
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
