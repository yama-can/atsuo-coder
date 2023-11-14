"use client";

import markdownHtml from 'zenn-markdown-html';
import 'zenn-content-css';
import { useEffect } from 'react';
import Head from 'next/head';

export default function Home(props: { searchParams: { html: string } }) {

	const html = markdownHtml(props.searchParams.html);

	useEffect(() => {
		import('zenn-embed-elements');
	}, []);

	return (
		<>
			<div
				// "znc"というクラス名を指定する
				className="znc"
				// htmlを渡す
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			/>
		</>
	)
}
