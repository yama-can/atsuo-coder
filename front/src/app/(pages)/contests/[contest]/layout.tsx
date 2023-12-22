import { cookies } from "next/headers";
import "./layout.css";
import styles from "./layout.module.css";
import { NextResponse } from "next/server";
import { User, getUserByToken } from "./tasks/@component/users";
import { getContest } from "./contests";
import { sql } from "@/app/sql";

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

	const contestInfo = await getContest(sql, params.contest, user?.id);

	let viewable = true;

	if (contestInfo[0].start + contestInfo[0].period > Date.now()) {
		if (!user) viewable = false;
		else if (!contestInfo[0].editor.includes(user.id) && !contestInfo[0].tester.includes(user.id) && !contestInfo[0].rated_users.includes(user.id) && !contestInfo[0].unrated_users.includes(user.id)) {
			viewable = false;
		}
	}

	return (
		<>
			{children}
			<div className={styles.contest}>
				<div className={styles.tab}>
					<ul>
						<div className="pagenow">
							<a href={`/contests/${params.contest}`}>
								<li>
									<span className={styles["material-icons"]}>home</span>
									<br />
									Top
								</li>
							</a>
						</div>
						{viewable ?
							<a href={`/contests/${params.contest}/tasks`}>
								<li>
									<span className={styles["material-icons"]}>
										task
									</span>
									<br />
									Tasks
								</li>
							</a> : <></>
						}
						<a href={`/contests/${params.contest}/standings`}>
							<li>
								<span className={styles["material-icons"]}>
									leaderboard
								</span>
								<br />
								Standings
							</li>
						</a>
						{viewable ?
							<a href={`/contests/${params.contest}/submissions`}>
								<li>
									<span className={styles["material-icons"]}>
										send
									</span>
									<br />
									Submittions
								</li>
							</a> : <></>
						}
					</ul>
				</div>
			</div>
			<div data-center="none"></div>
		</>
	)
}