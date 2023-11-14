import styles from "./main.module.css";

export default function RootLayout({
	children,
	params
}: {
	children: React.ReactNode,
	params: { [key: string]: string }
}) {
	return (
		<>
			<div className={styles.links}>
				<a href={`/contests/${params.contest}`}>Contest Top</a>
				<a href={`/contests/${params.contest}/tasks`}>Tasks</a>
				<a href={`/contests/${params.contest}/standings`}>Standings</a>
				<a href={`/contests/${params.contest}/submissions`}>Submissions</a>
			</div>
			{children}
		</>
	)
}