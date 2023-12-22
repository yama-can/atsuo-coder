import "./layout.css";
import styles from "./layout.module.css";

export default function RootLayout({
	children,
	params
}: {
	children: React.ReactNode,
	params: { [key: string]: string }
}) {
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

						<a href={`/contests/${params.contest}/tasks`}>
							<li>
								<span className={styles["material-icons"]}>
									task
								</span>
								<br />
								Tasks
							</li>
						</a>
						<a href={`/contests/${params.contest}/standings`}>
							<li>
								<span className={styles["material-icons"]}>
									leaderboard
								</span>
								<br />
								Standings
							</li>
						</a>
						<a href={`/contests/${params.contest}/submissions`}>
							<li>
								<span className={styles["material-icons"]}>
									send
								</span>
								<br />
								Submittions
							</li>
						</a>
					</ul>
				</div>
			</div>
			<div data-center="none"></div>
		</>
	)
}