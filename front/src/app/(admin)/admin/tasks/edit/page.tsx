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

		const task = tasks[0];

		return (
			<>
				<h1>Edit Tasks | AtsuoCoder Admin</h1>
				<p>Editing {searchParams.id}</p>
				<br />
				<div className={styles.body1}>
					<form action="/admin/tasks/post" method="post">
						<input type="hidden" name="type" defaultValue="edit" />
						<input type="hidden" name="id" defaultValue={searchParams.id} />
						<label htmlFor="name">Name</label>
						<br />
						<input name="name" id="name" type="text" autoComplete="on" placeholder="A. console.log" required defaultValue={task.name} />
						<br />
						<label htmlFor="id">ID</label>
						<br />
						<input name="id" id="id" type="text" autoComplete="on" placeholder="aac001_a" required disabled defaultValue={searchParams.id} />
						<br />
						<label htmlFor="editor">Editor</label>
						<br />
						<input name="editor" id="editor" type="text" required placeholder="yama_can, abn48" defaultValue={task.editor.join(', ')} />
						<br />
						<label htmlFor="editor" className={`${styles.warning} ${styles.show}`} id="editor-warning">
							<ul>
								<li> Warning: we will not warn if this field includes invalid username.</li>
							</ul>
						</label>
						<br />
						<label htmlFor="tester">Tester</label>
						<br />
						<input name="tester" id="tester" type="text" required placeholder="yama_can, abn48" defaultValue={task.tester.join(', ')} />
						<br />
						<label htmlFor="editor" className={`${styles.warning} ${styles.show}`} id="editor-warning">
							<ul>
								<li> Warning: we will not warn if this field includes invalid username.</li>
							</ul>
						</label>
						<br />
						<label htmlFor="question">Question</label>
						<br />
						<textarea name="question" id="question" required defaultValue={task.question} />
						<br />
						<input type="submit" defaultValue="Edit" />
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<h1>Edit Tasks | AtsuoCoder Admin</h1>
			<div className={styles.body1}>
				<form action="/admin/tasks/edit" method="get">
					<label htmlFor="id">ID</label>
					<br />
					<input name="id" id="id" type="text" autoComplete="on" placeholder="aac001" required />
					<br />
					<input type="submit" defaultValue="Edit" />
				</form>
			</div>
		</>
	)

}