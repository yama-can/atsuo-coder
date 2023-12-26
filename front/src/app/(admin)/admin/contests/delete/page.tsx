import { getContest } from "@/app/(pages)/contests/[contest]/contests";
import styles from "../form.module.css";
import { sql } from "@/app/sql";
import { notFound } from "next/navigation";

export default async function AdminContestsNew({ searchParams }: { searchParams: { id?: string } }) {

	if (searchParams.id) {

		const contests = await getContest(sql, searchParams.id);

		if (contests.length == 0) {
			notFound();
		}

		return (
			<>
				<h1>Delete Contest | AtsuoCoder Admin</h1>
				<p>Deleting {searchParams.id}</p>
				<br />
				<div className={styles.body1}>
					<form action="/admin/contests/post" method="post">
						<input type="hidden" name="type" defaultValue="delete" />
						<input type="hidden" name="id" defaultValue={searchParams.id} />
						<p>Are you sure to delete this contest <code>{searchParams.id}</code>?</p>
						<br />
						<input name="check" id="check" type="checkbox" required className={styles.check} />
						<label htmlFor="check">Yes, I&apos;m sure.</label>
						<br />
						<p>Even if you delete the contest, it will remain in the cache for a while.</p>
						<br />
						<input type="submit" defaultValue="Delete" className={styles.delete} />
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<h1>Delete Contest | AtsuoCoder Admin</h1>
			<div className={styles.body1}>
				<form action="/admin/contests/delete" method="get">
					<label htmlFor="id">ID</label>
					<br />
					<input name="id" id="id" type="text" autoComplete="on" placeholder="aac001" required />
					<br />
					<input type="submit" defaultValue="Delete" className={styles.delete} />
				</form>
			</div>
		</>
	)

}