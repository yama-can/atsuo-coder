import './globals.css'
import styles from './page.module.css'
import headerStyles from "./header.module.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import React, { useEffect } from 'react';
import { User, getUserByToken } from './contests/[contest]/tasks/@component/users'
import { sql } from '../sql'
import notFound from '../not-found'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Atsuo Coder',
	description: 'Judge System for W-PCP',
}

function baseChild(children: React.ReactNode, user: User | null) {
	return (
		<html lang="ja">
			<link rel="icon" href="/logo.png" />

			<body className={inter.className}>
				<div className={headerStyles.headers}>
					<header className={headerStyles.title}>
						<ul className={headerStyles.head}>
							<h2 className={headerStyles.titleText}>AtsuoCoder</h2>
							<ul className={headerStyles.login}>
								{
									user == null ?
										<><li><a href="/login">Login</a></li>
											<li className={headerStyles.signup}><a href="/signup">Sign Up</a></li></> :
										<>
											<li><a href="/logout">Logout</a></li>
											<li><a href="/account/settings" className={headerStyles.signup}>Account Settings</a></li>
										</>
								}
							</ul>
						</ul>
					</header>
					<ul className={headerStyles.menu}>
						<li><a href="/">Home</a></li>
						<li><a href="/contests">Contests</a></li>
						<li><a href="/ranking">Ranking</a></li>
					</ul>
				</div>

				<main className={`${styles.main} main`}>
					<div className={styles.center}></div>
					{children}
				</main>
			</body>
		</html>);
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const cookie = cookies();
	const user = await getUserByToken(sql, cookie.get("cc")?.value, cookie.get("ct")?.value);

	return (baseChild(children, user));
}
