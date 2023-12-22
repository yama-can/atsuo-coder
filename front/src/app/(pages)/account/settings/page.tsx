import { sql } from "@/app/sql";
import { getUserByToken } from "../../contests/[contest]/tasks/@component/users";
import styles from "../form.module.css";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function SettingPage({ searchParams }: { searchParams: { error: string } }) {

	const cookie = cookies();
	const user = await getUserByToken(sql, cookie.get("cc")?.value, cookie.get("ct")?.value);

	if (!user) {
		notFound();
	}

	return (
		<>
			<h1>Setting | AtsuoCoder</h1>
			<br />
			{
				searchParams.error == "0" ?
					<div className={styles.success}>
						<p>Updated!</p>
						<br />
					</div> :
					<></>
			}
			{
				searchParams.error == "1" ?
					<div className={styles.error}>
						<p>Error: wrong password!</p>
						<br />
					</div> :
					<></>
			}
			{
				searchParams.error == "2" ?
					<div className={styles.error}>
						<p>Error: password retype miss!</p>
					</div> :
					<></>
			}
			<div className={styles.body1}>
				<form className={styles.form} action="/account/post" method="post">
					<input type="hidden" name="type" defaultValue="update" />
					<label htmlFor="grade">Grade</label>
					<br />
					<input name="grade" id="grade" type="number" placeholder="130" required defaultValue={user.grade} />
					<br />
					<label htmlFor="name">Name</label>
					<br />
					<input name="name1" id="name1" type="text" autoComplete="on" placeholder="Last Name" required defaultValue={user.name[0]} />
					<br />
					<input name="name2" id="name2" type="text" autoComplete="on" placeholder="Middle Name" defaultValue={user.name.length == 2 ? "" : user.name[1]} />
					<br />
					<input name="name3" id="name3" type="text" autoComplete="on" placeholder="First Name" required defaultValue={user.name.length == 3 ? user.name[2] : user.name[1]} />
					<br />
					<input type="submit" defaultValue="Save changes" />
				</form>
			</div>
			<br />
			<div className={styles.body1}>
				<form className={styles.form} action="/account/post" method="post">
					<input type="hidden" name="type" defaultValue="password" />
					<label htmlFor="current_password">Current Password</label>
					<br />
					<input name="current_password" id="current_password" type="password" autoComplete="current-password" required />
					<br />
					<label htmlFor="new_password">New Password</label>
					<br />
					<input name="new_password" id="new_password" type="password" autoComplete="new-password" required />
					<br />
					<label htmlFor="new_password2">New Password (again)</label>
					<br />
					<input name="new_password2" id="new_password2" type="password" autoComplete="new-password" required />
					<br />
					<input type="submit" defaultValue="Save changes" />
				</form>
			</div>
		</>
	)

}