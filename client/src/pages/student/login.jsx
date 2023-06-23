import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";
export default function Login() {
	const router = useRouter();
	const [registerNumber, setRegisterNumber] = useState("");
	const [password, setPassword] = useState("");

	async function handleStudentLogin(e) {
		e.preventDefault();

		console.log(e);
		console.log({ registerNumber, password });

		let response = await fetch(`${API_URL}/student/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.parse({ regNo: registerNumber, password }),
		});
	}
	return (
		<>
			<h1>Login Page</h1>

			<form onSubmit={handleStudentLogin}>
				<div className="flex flex-col m-2 space-y-5">
					<input
						type="text"
						placeholder="Register Number"
						className="input input-bordered w-full max-w-xs"
						value={registerNumber}
						onChange={(e) => setRegisterNumber(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="input input-bordered w-full max-w-xs"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<input
						type="submit"
						className="btn btn-primary"
						value="Login"
					/>
				</div>
			</form>
		</>
	);
}
