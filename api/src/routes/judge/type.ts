import { Router } from "express";
import { Connection } from "mysql2/promise";

export default function Route(sql: Connection) {
	const router = Router();
	router.get('/', async (req, res, next) => {
		const params = new URL(req.url, "https://localhost").searchParams;

		if (!params.has("id")) {
			next();
			return;
		}

		res.json((await sql.query("SELECT judge_type from questions where id = ?;", [params.get("id")]))[0]);
	})

	return router;
}
