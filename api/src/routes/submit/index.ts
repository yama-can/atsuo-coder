import { Router } from "express";
import { Connection } from "mysql2/promise";


export default function Route(sql: Connection) {
	const router = Router();
	router.post('/', async (req, res) => {

		if (req.body.contest === undefined || req.body.task === undefined || req.body.sourceCode === undefined) {
			res.sendStatus(400);
			return;
		}

		const [{ user }] = (await sql.query("SELECT user FROM tokens WHERE id = ? AND ct = ?", [req.cookies.tt, req.cookies.ct]))[0] as [{ user: string }];
		await sql.query("INSERT INTO submissions (id, contest, task, sourceCode, user, created_at, judge) VALUES (uuid(), ?, ?, ?, ?, now(), 'WJ')", [req.body.task, req.body.contest, req.body.sourceCode, user]);



		res.redirect(`/${req.body.contest}/submissions/me`);
	});

	return router;
}
