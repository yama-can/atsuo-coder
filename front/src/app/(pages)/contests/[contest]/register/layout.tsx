import { cookies } from "next/headers";
import { getUserByToken } from "../tasks/@component/users";
import { sql } from "@/app/sql";
import { getContest } from "../contests";
import { notFound } from "next/navigation";

export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode,
	params: { [key: string]: string }
}) {

	let user = undefined;
	const cookie = cookies();
	if (cookie.get("cc") && cookie.get("ct")) {
		user = await getUserByToken(sql, cookie.get("cc")!!.value, cookie.get("ct")!!.value);
	}

	if (!user) {
		return <></>;
	}

	const contestInfo = await getContest(sql, params.contest, user?.id);

	if (contestInfo.length == 0) {
		return <></>;
	}

	if (contestInfo[0].start + contestInfo[0].period > Date.now()) {
		return <></>;
	}

	return <>{children}</>;

}