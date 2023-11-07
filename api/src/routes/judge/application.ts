import { Router } from "express";
import { Connection } from "mysql2/promise";
import fs from "fs";

export default function Route(sql: Connection) {
	const router = Router();
	router.get('/', async (req, res, next) => {
		const params = new URL(req.url, "https://localhost").searchParams;

		if (!params.has("id") || !fs.statSync(`./static/testcases/${params.get("id")}/app`, { throwIfNoEntry: false })?.isFile()) {
			next();
			return;
		}

		res.end(fs.readFileSync(`./static/testcases/${params.get("id")}/app`));
	})

	return router;
}
