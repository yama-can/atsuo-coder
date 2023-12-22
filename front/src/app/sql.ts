import mysql from "mysql2/promise";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(__dirname, "./../../../../.env") });

export const sql = await mysql.createConnection({
	user: "atsuo_judge",
	database: "atsuo_judge",
	password: process.env.db_password,
	stringifyObjects: true,
});
