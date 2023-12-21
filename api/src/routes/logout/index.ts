import express, { Router } from "express";
import { Connection } from "mysql2/promise";
import cookieParser from "cookie-parser";

export default function Route(sql: Connection) {
	const router = Router();
	router.use(express.urlencoded({ extended: true }));
	router.use(cookieParser());

	router.get('/', async (req, res, next) => {
		res.clearCookie("cc");
		res.clearCookie("ct");
		res.cookie("LEVEL_FLASH", "ログアウトしました。");
		res.redirect("/login");
	});

	return router;
}
