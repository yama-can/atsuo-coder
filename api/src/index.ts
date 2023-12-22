import next from "next";
import express from "express";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import mysql, { RowDataPacket } from "mysql2/promise";
import JudgeServer from "./judge/judge";
import { Testcases } from "@w-yama-can/judge-systems";
import http from "http";
import https from "https";
config({ path: path.join(__dirname, "./../../.env") });

const front = next({ dir: "../front", dev: process.argv.indexOf("--dev") != -1 });

let testcases: {
	[id: string]: {
		testcases: Testcases, options: {
			timeLimit?: number;
			memoryLimit?: number;
			outputLimit?: number;
		}
	}
} = {};


front.prepare().then(async () => {

	const app = express();
	const frontHandler = front.getRequestHandler();
	const sql = await mysql.createConnection({
		user: "atsuo_judge",
		database: "atsuo_judge",
		password: process.env.db_password,
		stringifyObjects: true,
	});

	const tasks = (await sql.query("SELECT id, judge_type FROM tasks;"))[0] as RowDataPacket[];

	tasks.forEach((task) => {

		const { id, judge_type } = task as { id: string, judge_type: string };

		const testcaseDirs = fs.readdirSync(path.join("./static/testcases", id));

		testcases[id] = { testcases: [], options: {} };

		testcaseDirs.forEach(testcase => {

			const tests = fs.readdirSync(path.join("./static/testcases", id, testcase));

			const dependencies = JSON.parse(fs.readFileSync(path.join("./static/testcases", id, testcase, "dependencies.json"), 'utf-8'));

			testcases[id].testcases.push({ id: testcase, tests: [], dependencies });

			tests.forEach(test => {

				if (!fs.statSync(path.join("./static/testcases", id, testcase, test)).isDirectory()) return;

				const { type, score, outcheck, interactive } = JSON.parse(fs.readFileSync(path.join("./static/testcases", id, testcase, test, "config.json"), 'utf-8'));

				if (type == "plane") {

					testcases[id].testcases[testcases[id].testcases.length - 1].tests.push({ id: test, input: path.join("./static/testcases", id, testcase, test, "in.txt"), output: path.join("./static/testcases", id, testcase, test, "out.txt"), score });

				} else if (type == "outcheck") {

					testcases[id].testcases[testcases[id].testcases.length - 1].tests.push({ id: test, input: path.join("./static/testcases", id, testcase, test, "in.txt"), check: path.join("./static/testcases", id, testcase, test, outcheck), score });

				} else if (type == "interactive") {

					testcases[id].testcases[testcases[id].testcases.length - 1].tests.push({ id: test, interactive: path.join("./static/testcases", id, testcase, test, interactive) });

				}

			});

		});
	});

	const judgeServer = new JudgeServer(testcases);
	// judgeServer.addQueue(sql, "test");
	setInterval(() => {
		judgeServer.updateQueue(sql);
	}, 1500);

	app.use((req, res, next) => {
		if (req.path.endsWith("/") && req.path.length > 1) {
			const query = req.url.slice(req.path.length)
			res.redirect(301, req.path.slice(0, -1) + query)
		} else {
			next()
		}
	})

	const files = fs.readdirSync(path.join(__dirname, "routes"));

	for (let i = 0; i < files.length; i++) {
		const p = path.parse(files[i]);
		if (p.name.startsWith('@')) continue;
		if (fs.statSync(path.join(__dirname, "./routes", files[i])).isFile()) {
			if (files[i] == 'index.js' || files[i].endsWith('/index.js')) {
				const input = (await import(path.join(__dirname, "./routes", files[i])));
				app.use(path.join("/", files[i], '../'), input.default(sql, judgeServer));
				console.log(`Loaded ${path.join(__dirname, "./routes", files[i])} as ${path.join("/", files[i], '../')}`);
			} else {
				const input = (await import(path.join(__dirname, "./routes", files[i])));
				app.use(path.join("/", files[i].replace(/\.js$/, "")), input.default(sql, judgeServer));
				console.log(`Loaded ${path.join(__dirname, "./routes", files[i])} as ${path.join("/", files[i].replace(/\.js$/, ""))}`);
			}
		} else {
			files.push(...fs.readdirSync(path.join(__dirname, "./routes", files[i])).map((file) => path.join(files[i], file)));
		}
	}

	console.log("All files loaded");

	app.all("*", (req, res) => frontHandler(req, res));

	http.createServer((rep, res) => res.writeHead(301, { Location: `https://${rep.headers.host}${rep.url}` }).end()).listen(80);
	https.createServer({ cert: fs.readFileSync(path.join(__dirname, "./../../certs/cert.pem")), key: fs.readFileSync(path.join(__dirname, "./../../certs/key.pem")) }, app).listen(443, "0.0.0.0")
});

type Router = ((sql: mysql.Connection) => express.Router);

export default Router;
