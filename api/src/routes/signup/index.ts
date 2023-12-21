import { Router, urlencoded } from "express";
import { Connection } from "mysql2/promise";
import crypto from "crypto";

export default function Route(sql: Connection) {
	const router = Router();
	router.use(urlencoded({ extended: true }));
	router.post('/', async (req, res, next) => {

		if (
			!req.body.username ||
			!req.body.password ||
			!req.body.name1 ||
			!req.body.name3 ||
			(req.body.name1 as string).length == 0 ||
			(req.body.name3 as string).length == 0 ||
			(req.body.username as string).length == 0 ||
			(req.body.username as string).length > 16 ||
			!(req.body.username as string).match(/^[0-9a-z\_\-]*$/) ||
			(req.body.password as string).length < 8 ||
			(req.body.password as string).length > 255 ||
			(req.body.password as string).match(/^[0-9]*$/) ||
			(req.body.password as string).match(/^[a-zA-Z]*$/) ||
			((await sql.query("SELECT id from users where id = ?", [req.body.username]))[0] as any[]).length != 0
		) {
			res.sendStatus(400);
			res.end();
			return;
		}

		const hash = crypto.createHash("sha256").update(req.body.password).digest("hex");

		await sql.query("INSERT into users (id, password, rating, name, grade) values (?,?,?,?,?)", [req.body.username, hash, 0, JSON.stringify([req.body.name1, req.body.name2, req.body.name3].filter(Boolean)), Number(req.body.grade)]);

		res.cookie("LEVEL_FLASH", "サインアップしました。再ログインしてください。");
		res.redirect("/login");

	});

	return router;
}
