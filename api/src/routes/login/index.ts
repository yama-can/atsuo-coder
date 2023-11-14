import express, { Router } from "express";
import { Connection } from "mysql2/promise";
import { getUser, getUserByToken, getUserUsingPassword, login } from "../../component/users";
import cookieParser from "cookie-parser";

export default function Route(sql: Connection) {
	const router = Router();
	router.use(express.urlencoded({ extended: true }));
	router.use(cookieParser());
	router.post('/', async (req, res, next) => {

		if (!req.body.id || !req.body.password || !req.body.ct_token) {
			res.sendStatus(400);
			return;
		}

		const tokenCheck = await sql.query("SELECT id from ct_token WHERE id = ? AND use_to = 'LOGIN';", [req.body.ct_token]);

		if (Array.from(tokenCheck[0] as any).length == 0) {
			res.sendStatus(403);
			return;
		}

		await sql.query("DELETE FROM ct_token WHERE id = ?;", [req.body.ct_token]);

		if (req.cookies.cc && req.cookies.ct) {
			const loginCheck = await getUserByToken(sql, req.cookies.cc, req.cookies.ct);
			if (loginCheck) {
				res.end("Already logged in " + loginCheck.id);
				return;
			}
		}

		const user = await getUserUsingPassword(sql, req.body.id, req.body.password);

		if (user) {
			const { token, ct } = await login(sql, user.id);
			res.cookie("cc", token, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
			res.cookie("ct", ct, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
			if (req.body.redirect_to) {
				res.redirect(req.body.redirect_to);
			} else {
				res.redirect("/");
			}
		} else {
			if (req.body.redirect_to) {
				res.redirect("/login?error=1&redirect_to=" + encodeURIComponent(req.body.redirect_to));
			} else {
				res.redirect("/login?error=1");
			}
		}
	});

	router.get('/me', async (req, res) => {
		if (!req.cookies.cc || !req.cookies.ct) {
			res.sendStatus(400);
			return;
		}

		const tokenCheck = await sql.query("SELECT user from tokens WHERE id = ? AND ct = ?;", [req.cookies.cc, req.cookies.ct]);

		if (Array.from(tokenCheck[0] as any).length == 0) {
			res.sendStatus(403);
			return;
		}

		res.end(Array.from(tokenCheck[0] as any[])[0].user);
	});

	return router;
}
