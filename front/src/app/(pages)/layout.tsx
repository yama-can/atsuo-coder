import './globals.css'
import styles from './page.module.css'
import headerStyles from "./header.module.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Atsuo Coder',
	description: 'Judge System for W-PCP',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ja">
			<link rel="icon" href="/logo.png" />

			<body className={inter.className}>
				<div className={headerStyles.headers}>
					<header className={headerStyles.title}>

						<div className={headerStyles.bg1}></div>
						<div className={headerStyles.bg2}></div>
						<div className={headerStyles.bg3}></div>
						<div className={headerStyles.bg4}></div>
						<div className={headerStyles["bg5-1"]}></div>
						<div className={headerStyles["bg5-2"]}></div>
						<a href="/">AtsuoCoder</a>

					</header>

					<header className={headerStyles.list}>
						<a href="/">Home</a>
						<a href="/contests">Contests</a>
						<a href="/ranking">Ranking</a>
					</header>
				</div>

				<main className={styles.main}>
					<div className={styles.center}>
					</div>
					{children}
				</main>
			</body>
		</html>
	)
}
