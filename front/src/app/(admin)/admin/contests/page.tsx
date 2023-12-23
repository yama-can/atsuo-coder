import styles from "./page.module.css";

export default async function AdminContests() {
	return (
		<>
			<h1>Contests | AtsuoCoder Admin</h1>
			<ul className={styles.buttons}>
				<a href="/admin/contests/new">
					<li>
						<span className={styles["material-icons"]}>add</span>
						New Contest
					</li>
				</a>
				<a href="/admin/contests/edit">
					<li>
						<span className={styles["material-icons"]}>edit</span>
						Edit Contest
					</li>
				</a>
				<a href="/admin/contests/delete">
					<li>
						<span className={styles["material-icons"]}>delete</span>
						Delete Contest
					</li>
				</a>
			</ul>
		</>
	)
}