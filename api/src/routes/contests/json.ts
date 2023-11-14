import { Router } from "express";
import { Connection } from "mysql2/promise";
import { Contest, getContests } from "../../component/contests";
import { getUserByToken } from "../../component/users";
import cookieParser from "cookie-parser";

export default function Route(sql: Connection) {
	const router = Router();
	router.use(cookieParser());
	router.get('/', async (req, res, next) => {

		const user = await getUserByToken(sql, req.cookies.cc, req.cookies.ct);

		res.json(
			(await getContests(sql, user?.id)).map((element) => {

				let response: any = element;

				if (response["period"] != -1 && response["start"] + response["period"] < Date.now())
					delete response['problems'];

				return { ...response };

			})
		);

	})

	return router;
}
