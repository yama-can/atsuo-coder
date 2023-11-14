import { User, getUsers } from "../../component/users";
import { Router } from "express";
import { Connection } from "mysql2/promise";

export default function Route(sql: Connection) {
	const router = Router();
	router.get('/', async (req, res) => {

		const result = (await getUsers(sql)).map((user) => {

			let parse: Partial<User> = user;

			delete parse.password;

			return parse;

		});

		res.json(result);
	})

	return router;
}
