import { Router } from "express";
import { Connection } from "mysql2/promise";
import { Contest, getContests } from "../../component/contests";

export default function Route(sql: Connection) {
	const router = Router();
	router.get('/', async (req, res, next) => {

		res.json(
			(await getContests(sql)).map((element) => {

				let response: any = element;

				delete response['problems'];

				return response;

			})
		);

	})

	return router;
}
