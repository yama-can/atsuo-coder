import { Router } from "express";
import { Connection } from "mysql2/promise";

export default function Route(sql: Connection) {
	const router = Router();
	router.get('/', async (req, res, next) => {
		
		// ToDo コンテストの連携等
		console.error("コンテストと連携してください");
		return;
		res.json(((await sql.query("SELECT * from tasks where id = ?;"))[0] as { id: string, problems: string, private: boolean }[]).map((element) => ({ ...element, problems: JSON.parse(element.problems) })));

	})

	return router;
}
