import { Router } from "express";
import { Connection, RowDataPacket } from "mysql2/promise";

export default function Route(sql: Connection) {
	const router = Router();
	router.use('/', async (req, res, next) => {
		const params = new URL(req.url, "https://localhost").searchParams;

		if (!params.has('token')) {
			res.status(404);
			res.end();
			return;
		}

		const result = await sql.query("SELECT id FROM judge_servers where token = ?;", [params.get('token')]);
		
		if ((result[0] as RowDataPacket[]).length != 0) {
			next();
			return;
		}
		
		res.status(401);
		res.end();
	})

	return router;
}
