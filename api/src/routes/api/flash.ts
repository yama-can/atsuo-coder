import { Router } from "express";
import { Connection } from "mysql2/promise";
import { Contest, getContests } from "../../component/contests";
import { getUserByToken } from "../../component/users";
import cookieParser from "cookie-parser";

export default function Route(sql: Connection) {
	const router = Router();
	router.use(cookieParser());
	router.get('/', async (req, res, next) => {
		
		res.cookie("LEVEL_FLASH", req.query.flash);

		res.redirect(req.query.redirect as string);

	})

	return router;
}
