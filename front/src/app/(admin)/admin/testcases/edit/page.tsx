import styles from "../form.module.css";
import { sql } from "@/app/sql";
import { notFound } from "next/navigation";
import { getTask } from "@/app/(pages)/contests/[contest]/task";
import fs from "fs";

export default async function AdminContestsNew({ searchParams }: { searchParams: { id?: string, task_id?: string } }) {

	if (searchParams.id && searchParams.task_id) {

		const tasks = await getTask(sql, searchParams.task_id);

		if (tasks.length == 0) {
			notFound();
		}

		if (!(fs.statSync(`./static/testcases/${searchParams.task_id}/${searchParams.id}`, { throwIfNoEntry: false })?.isDirectory())) {
			notFound();
		}

		const task = tasks[0];

		return (
			<>
				<h1>Edit Testcase | AtsuoCoder Admin</h1>
				<br />
				<div className={styles.body1}>
					<form action="/admin/testcases/post" method="post">
						<input type="hidden" name="type" defaultValue="edit" />
						<label htmlFor="task_id">Task ID</label>
						<br />
						<input name="task_id" id="task_id" type="text" autoComplete="on" placeholder="aac001_a" required defaultValue={searchParams.task_id} disabled />
						<br />
						<label htmlFor="id">ID</label>
						<br />
						<input name="id" id="id" type="text" autoComplete="on" placeholder="test_a" required defaultValue={searchParams.id} disabled />
						<br />
						<label htmlFor="input">Reupload input files</label>
						<br />
						<input name="input" id="input" type="file" multiple accept=".txt" />
						<br />
						<label htmlFor="output">Reupload output files</label>
						<br />
						<input name="output" id="output" type="file" multiple accept=".txt" />
						<input type="submit" defaultValue="Edit" />
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<h1>Edit Testcases | AtsuoCoder Admin</h1>
			<div className={styles.body1}>
				<form action="/admin/testcases/edit" method="get">
					<label htmlFor="task_id">Task ID</label>
					<br />
					<input name="task_id" id="task_id" type="text" autoComplete="on" placeholder="aac001_a" required />
					<br />
					<label htmlFor="id">ID</label>
					<br />
					<input name="id" id="id" type="text" autoComplete="on" placeholder="test_a" required />
					<input type="submit" defaultValue="Next" />
				</form>
			</div>
		</>
	)

}