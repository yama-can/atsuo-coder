import styles from "../form.module.css";

export default async function AdminContestsNew() {
	return (
		<>
			<h1>New Contest | AtsuoCoder Admin</h1>
			<div className={styles.body1}>
				<form action="/admin/contests/post" method="post">
					<input type="hidden" name="type" defaultValue="new" />
					<label htmlFor="name">Name</label>
					<br />
					<input name="name" id="name" type="text" autoComplete="on" placeholder="AtsuoCoder Algorithm Contest 001" required />
					<br />
					<label htmlFor="id">ID</label>
					<br />
					<input name="id" id="id" type="text" autoComplete="on" placeholder="aac001" required />
					<br />
					<label htmlFor="id" className={`${styles.warning} ${styles.show}`} id="id-warning">
						<ul>
							<li> Warning: Do not include <a href="/reserved.json"><u>reserved strings</u></a>.</li>
						</ul>
					</label>
					<br />
					<label htmlFor="start">Start</label>
					<br />
					<input name="start" id="start" type="datetime-local" required />
					<br />
					<label htmlFor="period">Period</label>
					<br />
					<input name="period" id="period" type="number" required className={styles.period} placeholder="100" />
					<label htmlFor="period">minutes</label>
					<br />
					<label htmlFor="penalty">Penalty</label>
					<br />
					<input name="penalty" id="penalty" type="number" required className={styles.period} placeholder="5" />
					<label htmlFor="penalty">minutes</label>
					<br />
					<label htmlFor="problems">Problems</label>
					<br />
					<input name="problems" id="problems" type="text" required placeholder="aac001_a, aac001_b, aac001_c ... , aac001_f" />
					<br />
					<label htmlFor="editor">Editor</label>
					<br />
					<input name="editor" id="editor" type="text" required placeholder="yama_can, abn48" />
					<br />
					<label htmlFor="tester">Tester</label>
					<br />
					<input name="tester" id="tester" type="text" required placeholder="yama_can, abn48" />
					<br />
					<label htmlFor="description">Description</label>
					<br />
					<textarea name="description" id="description" placeholder="This contest is ..." required />
					<br />
					<input type="submit" defaultValue="Create" />
				</form>
			</div>
		</>
	)
}