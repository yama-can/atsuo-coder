import styles from "../form.module.css";
import { sql } from "@/app/sql";
import { notFound } from "next/navigation";
import { getTask } from "@/app/(pages)/contests/[contest]/task";

export default async function AdminContestsNew({ searchParams }: { searchParams: { id?: string } }) {

	if (searchParams.id) {

		const tasks = await getTask(sql, searchParams.id);

		if (tasks.length == 0) {
			notFound();
		}
		
		return (
			<>
				<h1>Delete Contest | AtsuoCoder Admin</h1>
				<p>Deleting {searchParams.id}</p>
				<br />
				<div className={styles.body1}>
					<form action="/admin/tasks/post" method="post">
						<input type="hidden" name="type" defaultValue="delete" />
						<input type="hidden" name="id" defaultValue={searchParams.id} />
						<p>Are you sure to delete this task <code>{searchParams.id}</code>?</p>
						<br />
						<input name="check" id="check" type="checkbox" required className={styles.check} />
						<label htmlFor="check">Yes, I'm sure.</label>
						<br />
						<p>Even if you delete the task, it will remain in the cache for a while.</p>
						<br />
						<input type="submit" defaultValue="Delete" className={styles.delete} />
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<h1>Delete Contest | AtsuoCoder Admin</h1>
			<div className={styles.body1}>
				<form action="/admin/tasks/delete" method="get">
					<label htmlFor="id">ID</label>
					<br />
					<input name="id" id="id" type="text" autoComplete="on" placeholder="aac001_a" required />
					<br />
					<input type="submit" defaultValue="Delete" className={styles.delete} />
				</form>
			</div>
		</>
	)

}