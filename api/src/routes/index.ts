import { Router } from "express";
import { Connection } from "mysql2/promise";

export default function Route(sql: Connection) {
	const router = Router();
	router.all('/', (req, res, next) => {
		next();
	})

	return router;
}
