import cookieParser from "cookie-parser";
import { User, getUser, getUserByToken, getUsers } from "../../component/users";
import { Router } from "express";
import { Connection } from "mysql2/promise";
import { getContest } from "../../component/contests";

export default function Route(sql: Connection) {
	const router = Router();
	router.use(cookieParser());
	router.get('/', async (req, res) => {

		if (!req.query.contest) {
			res.end("NO");
			return;
		}

		const user = await getUserByToken(sql, req.cookies.cc, req.cookies.ct);
		const contest = await getContest(sql, req.query.contest as string, user?.id || "undefined");

		if (!contest) {
			res.end("NO");
			return;
		}

		// コンテスト中の際
		if (contest[0].start + contest[0].period > Date.now()) {
			// 編集者・テスターの場合は無視
			if (!user || (!contest[0].editor.indexOf(user.id) && !contest[0].tester.indexOf(user.id))) {
				// 投稿者・編集者・テスター以外のコードの閲覧を禁止
				if (!user || (!contest[0].rated.indexOf(user.id) && !contest[0].unrated.indexOf(user.id))) {
					res.end("NO");
					return;
				}
				if (req.query.user) {
					// ユーザー指定がある場合、投稿者以外の閲覧を禁止
					if (user.id != req.query.user) {
						res.end("NO");
						return;
					}
				} else {
					// ユーザー指定がない場合、閲覧を禁止
					res.end("NO");
					return;
				}
			}
		}

		res.end("OK");
	})

	return router;
}
