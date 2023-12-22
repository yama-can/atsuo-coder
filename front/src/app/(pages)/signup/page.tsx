"use client";
import reserved from "@/../../reserved.json";
import styles from "./signup.module.css"
import { useEffect } from "react";

export default function Signup() {

	useEffect(() => {

		const submitButton = document.querySelector("input#submit") as HTMLInputElement;

		document.addEventListener("keydown", (ev) => {
			if (ev.key == "enter") {
				ev.preventDefault();
				if (!submitButton.disabled) {
					submitButton.click();
				}
			}
		})

		const username = document.querySelector("input#username") as HTMLInputElement;
		const password = document.querySelector("input#password") as HTMLInputElement;
		const grade = document.querySelector("input#grade") as HTMLInputElement;
		const name1 = document.querySelector("input#name1") as HTMLInputElement;
		const name3 = document.querySelector("input#name3") as HTMLInputElement;
		const usernameWarningElement = document.querySelector("label#username-warning")!!;
		const passwordWarningElement = document.querySelector("label#password-warning")!!;

		function submitUpdate() {
			submitButton.disabled = !(!usernameWarningElement.classList.contains(styles.show) && !passwordWarningElement.classList.contains(styles.show) && username.value.length != 0 && password.value.length != 0 && name1.value.length != 0 && name3.value.length != 0 && grade.value.length != 0);
		}

		username.addEventListener("input", () => {

			const warningList = usernameWarningElement.querySelector("ul")!!;
			warningList.innerHTML = "";

			if (reserved.find((value) => username.value.includes(value))) {
				const element = document.createElement("li");
				element.textContent = "ユーザー名に" + reserved.find((value) => username.value.includes(value)) + "を含んではいけません";
				warningList.appendChild(element);
			}

			if (username.value.length == 0) {
				const element = document.createElement("li");
				element.textContent = "ユーザー名は必須です";
				warningList.appendChild(element);
			}

			if (username.value.length > 16) {
				const element = document.createElement("li");
				element.textContent = "ユーザー名は16文字以下にしてください";
				warningList.appendChild(element);
			}

			if (!username.value.match(/^[0-9a-z\_\-]*$/)) {
				const element = document.createElement("li");
				element.textContent = "ユーザー名は英小数字のみ使用できます";
				warningList.appendChild(element);
			}

			if (warningList.childNodes.length != 0) {
				usernameWarningElement.classList.add(styles.show);
			} else {
				usernameWarningElement.classList.remove(styles.show);
			}

			submitUpdate();

		});

		password.addEventListener("input", () => {

			const warningList = passwordWarningElement.querySelector("ul")!!;
			warningList.innerHTML = "";

			if (password.value.length < 8) {
				const element = document.createElement("li");
				element.textContent = "パスワードは8文字以上にしてください";
				warningList.appendChild(element);
			}
			if (password.value.length > 255) {
				const element = document.createElement("li");
				element.textContent = "パスワードは255文字以下にしてください";
				warningList.appendChild(element);
			}
			if (password.value.match(/^[0-9]*$/)) {
				const element = document.createElement("li");
				element.textContent = "パスワードには英文字を入れてください";
				warningList.appendChild(element);
			}
			if (password.value.match(/^[a-zA-Z]*$/)) {
				const element = document.createElement("li");
				element.textContent = "パスワードには数字を入れてください";
				warningList.appendChild(element);
			}

			if (warningList.childNodes.length != 0) {
				passwordWarningElement.classList.add(styles.show);
			} else {
				passwordWarningElement.classList.remove(styles.show);
			}

			submitUpdate();

		});

		document.addEventListener("input", () => {
			submitUpdate();
		});
	});

	return (
		<>
			<div className={styles.body1}>
				<h1>Sign up | AtsuoCoder</h1>
				<form action="/signup" method="post" autoComplete="on" className={styles.form} encType="application/x-www-form-urlencoded">
					<label htmlFor="username">Username</label>
					<br />
					<input name="username" id="username" autoComplete="username" pattern="[0-9a-z]{1-16}" />
					<label htmlFor="username" className={styles.warning} id="username-warning">
						<ul></ul>
					</label>
					<label htmlFor="password">Password</label>
					<br />
					<input name="password" id="password" type="password" autoComplete="new-password" pattern=".{8-255}" />
					<label htmlFor="password" className={styles.warning} id="password-warning">
						<ul></ul>
					</label>
					<label htmlFor="grade">Grade</label>
					<br />
					<input name="grade" id="grade" type="number" autoComplete="on" pattern="[0-9]{2,3}" />
					<br />
					<label htmlFor="name">Name</label>
					<br />
					<input name="name1" id="name1" type="text" autoCorrect="off" placeholder="Last Name" required />
					<input name="name2" id="name2" type="text" autoCorrect="off" placeholder="Middle Name" />
					<input name="name3" id="name3" type="text" autoCorrect="off" placeholder="First Name" required />
					<input type="submit" id="submit" value="Submit" autoComplete="off" disabled />
				</form>
			</div>
		</>
	)

}