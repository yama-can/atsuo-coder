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

		if(!(fs.statSync(`./static/testcases/${searchParams.task_id}/${searchParams.id}`, { throwIfNoEntry: false })?.isDirectory())) {
			notFound();
		}

		return (
			<>
				<h1>Delete Testcase | AtsuoCoder Admin</h1>
				<br />
				<div className={styles.body1}>
					<form action="/admin/testcases/post" method="post" encType="multipart/form-data">
						<input type="hidden" name="type" defaultValue="delete" />
						<label htmlFor="task_id">Task ID</label>
						<br />
						<input name="task_id" type="hidden" defaultValue={searchParams.task_id} />
						<input id="task_id" type="text" autoComplete="on" placeholder="aac001_a" required defaultValue={searchParams.task_id} disabled />
						<br />
						<label htmlFor="id">ID</label>
						<br />
						<input type="hidden" name="id" defaultValue={searchParams.id} />
						<input type="text" id="id" defaultValue={searchParams.id} disabled />
						<p>Are you sure to delete this testcase <code>{searchParams.task_id}/{searchParams.id}</code>?</p>
						<br />
						<input name="check" id="check" type="checkbox" required className={styles.check} />
						<label htmlFor="check">Yes, I&apos;m sure.</label>
						<br />
						<input type="submit" defaultValue="Delete" className={styles.delete} />
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<h1>Delete Testcase | AtsuoCoder Admin</h1>
			<div className={styles.body1}>
				<form action="/admin/testcases/delete" method="get">
					<label htmlFor="task_id">Task ID</label>
					<br />
					<input name="task_id" id="task_id" type="text" autoComplete="on" placeholder="aac001_a" required />
					<br />
					<label htmlFor="id">ID</label>
					<br />
					<input name="id" id="id" type="text" autoComplete="on" placeholder="test_a" required />
					<br />
					<input type="submit" defaultValue="Delete" className={styles.delete} />
				</form>
			</div>
		</>
	)

}