import { cookies } from "next/headers";
import "./layout.css";
import styles from "./layout.module.css";
import { sql } from "@/app/sql";
import { User, getUserByToken } from "@/app/(pages)/contests/[contest]/tasks/@component/users";

export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode,
	params: { [key: string]: string }
}) {

	let user: User | null = null;
	const cookie = cookies();
	if (cookie.get("cc") && cookie.get("ct")) {
		user = await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value);
	}

	return (
		<>
			{children}
			<div className={styles.contest}>
				<div className={styles.tab}>
					<ul>
						<div className="pagenow">
							<a href="/admin">
								<li>
									<span className={styles["material-icons"]}>home</span>
									<br />
									Top
								</li>
							</a>
							<a href="/admin/contests">
								<li>
									<span className={styles["material-icons"]}>format_list_numbered</span>
									<br />
									Contests
								</li>
							</a>
							<a href="/admin/tasks">
								<li>
									<span className={styles["material-icons"]}>task</span>
									<br />
									Tasks
								</li>
							</a>
							<a href="/admin/submissions">
								<li>
									<span className={styles["material-icons"]}>send</span>
									<br />
									Submissions
								</li>
							</a>
							<a href="/admin/testcases">
								<li>
									<span className={styles["material-icons"]}>quiz</span>
									<br />
									Testcases
								</li>
							</a>
							<a href="/admin/users">
								<li>
									<span className={styles["material-icons"]}>group</span>
									<br />
									Users
								</li>
							</a>
						</div>
					</ul>
				</div>
			</div>
			<div data-center="none"></div>
		</>
	)
}