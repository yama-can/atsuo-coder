import parse from 'html-react-parser';
import { sql } from "@/app/sql";
import { getContest } from "../../contests";
import { notFound } from "next/navigation";
import { getTask, getTasks } from "../../task";
import { marked } from "marked";
import dynamic from "next/dynamic";
import { cookies } from 'next/headers';
import crypto from "crypto";
import { getUserByToken } from '../@component/users';

import submitStyle from "./task.module.css";
import React from 'react';

export default async function Home(p: { params: { contest: string, task: string } }) {

	let user = undefined;
	const cookie = cookies();

	if (cookie.has("cc") && cookie.has("ct")) {
		user = await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value);
	}

	const contestInfo = await getContest(sql, p.params.contest, user?.id);

	if (contestInfo.length == 0) {
		notFound();
	}

	if (contestInfo[0].problems.indexOf(p.params.task) == -1) {
		notFound();
	}

	const taskInfo = await getTask(sql, p.params.task);

	const Mathjax = dynamic(() => import("./mathjax"), {
		ssr: false
	});

	// console.log(parse(marked(taskInfo[0].question)));

	const ct_token = crypto.randomUUID();
	await sql.query("INSERT into ct_token (id, use_to, created_at, user_id) VALUES (?, ?, now(), ?);", [ct_token, "SUBMIT", user?.id]);

	if (contestInfo[0].start + contestInfo[0].period > Date.now()) {
		if (!user) notFound();
		if (taskInfo[0].editor.indexOf(user!!.id) == -1 && taskInfo[0].tester.indexOf(user!!.id) == -1 && contestInfo[0].rated.indexOf(user!!.id) == -1 && contestInfo[0].unrated.indexOf(user!!.id) == -1) {
			notFound();
		}
	}

	return (
		<>
			<title>{taskInfo[0].name}</title>
			<h1>{taskInfo[0].name}</h1>
			<p>
				Editor: {taskInfo[0].editor} Tester: {taskInfo[0].tester.length == 0 ? "なし" : taskInfo[0].tester}<br />
				Score: {taskInfo[0].score}
			</p>
			<div id="task">
				<Mathjax>
					<div id="task">
						{parse(marked(taskInfo[0].question))}
					</div>
				</Mathjax>
			</div>

			<div id="submit" className={submitStyle.submit}>
				<iframe src={`/frame/submit?contest=${p.params.contest}&task=${p.params.task}&language=cpp23&csrf=${ct_token}`} id="submit-frame" className={submitStyle.frame}></iframe>
			</div>
		</>
	)
}
