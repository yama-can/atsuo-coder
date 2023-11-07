import styles from './page.module.css'

export default function Home() {
	return (
		<>
			<h1>Atsuo Coder</h1>
			<p>PCプログラミング部の公式ジャッジサーバー</p>


			<div className={styles.grid}>
				<a
					href="/contests"
					className={styles.card}
					target="_top"
				>
					<h2>
						Contests <span>-&gt;</span>
					</h2>
					<p>コンテスト一覧を閲覧する</p>
				</a>

				<a
					href="/ranking"
					className={styles.card}
					target="_top"
				>
					<h2>
						Ranking <span>-&gt;</span>
					</h2>
					<p>ランキングを確認する</p>
				</a>

				<a
					href="/login"
					className={styles.card}
					target="_top"
				>
					<h2>
						Login <span>-&gt;</span>
					</h2>
					<p>ログインする</p>
				</a>
			</div>
		</>
	)
}
