import { getContest } from "@/app/(pages)/contests/[contest]/contests";
import styles from "../form.module.css";
import { sql } from "@/app/sql";
import { notFound } from "next/navigation";

export default async function AdminContestsNew({ searchParams }: { searchParams: { id?: string } }) {

	if (searchParams.id) {

		const contests = await getContest(sql, searchParams.id);
		if (contests.length == 0) {
			notFound();
		}

		const contest = contests[0];

		return (
			<>
				<h1>Edit Contest | AtsuoCoder Admin</h1>
				<p>Editing {searchParams.id}</p>
				<br />
				<div className={styles.body1}>
					<form action="/admin/contests/post" method="post">
						<input type="hidden" name="type" defaultValue="edit" />
						<input type="hidden" name="id" defaultValue={searchParams.id} />
						<label htmlFor="name">Name</label>
						<br />
						<input name="name" id="name" type="text" autoComplete="on" placeholder="AtsuoCoder Algorithm Contest 001" required defaultValue={contest.name} />
						<br />
						<label htmlFor="id">ID</label>
						<br />
						<input name="id" id="id" type="text" autoComplete="on" placeholder="aac001" required disabled defaultValue={searchParams.id} />
						<br />
						<label htmlFor="start">Start</label>
						<br />
						<input name="start" id="start" type="datetime-local" required defaultValue={new Date(contest.start).toISOString().slice(0, 16)} />
						<br />
						<label htmlFor="period">Period</label>
						<p>If this contest should be permanent contest, set this field &quot;-1&quot;.</p>
						<br />
						<input name="period" id="period" type="number" required className={styles.period} placeholder="100" defaultValue={contest.period} />
						<label htmlFor="period">minutes</label>
						<br />
						<label htmlFor="penalty">Penalty</label>
						<br />
						<input name="penalty" id="penalty" type="number" required className={styles.period} placeholder="5" />
						<label htmlFor="penalty">minutes</label>
						<br />
						<label htmlFor="problems">Problems</label>
						<br />
						<input name="problems" id="problems" type="text" required placeholder="aac001_a, aac001_b, aac001_c ... , aac001_f" defaultValue={contest.problems.join(', ')} />
						<br />
						<label htmlFor="editor" className={`${styles.warning} ${styles.show}`} id="editor-warning">
							<ul>
								<li> Warning: we will not warn if this field includes invalid problem ID.</li>
							</ul>
						</label>
						<br />
						<label htmlFor="editor">Editor</label>
						<br />
						<input name="editor" id="editor" type="text" required placeholder="yama_can, abn48" defaultValue={contest.editor.join(', ')} />
						<br />
						<label htmlFor="editor" className={`${styles.warning} ${styles.show}`} id="editor-warning">
							<ul>
								<li> Warning: we will not warn if this field includes invalid username.</li>
							</ul>
						</label>
						<br />
						<label htmlFor="tester">Tester</label>
						<br />
						<input name="tester" id="tester" type="text" required placeholder="yama_can, abn48" defaultValue={contest.tester.join(', ')} />
						<br />
						<label htmlFor="editor" className={`${styles.warning} ${styles.show}`} id="editor-warning">
							<ul>
								<li> Warning: we will not warn if this field includes invalid username.</li>
							</ul>
						</label>
						<br />
						<label htmlFor="description">Description</label>
						<br />
						<textarea name="description" id="description" placeholder="This contest is ..." required />
						<br />
						<input type="submit" defaultValue="Edit" />
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<h1>Edit Contest | AtsuoCoder Admin</h1>
			<div className={styles.body1}>
				<form action="/admin/contests/edit" method="get">
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