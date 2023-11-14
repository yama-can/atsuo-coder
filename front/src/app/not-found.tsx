import layout from "./(pages)/layout";

export default async function notFound() {
	return layout({
		children:
			<>
				<h1>404 | Atsuo Coder</h1>
				<p>お探しのページは見つかりませんでした。</p>
			</>
	});
}