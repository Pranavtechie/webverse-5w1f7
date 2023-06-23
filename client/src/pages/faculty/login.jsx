import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL, setAuthToken } from "@/constants";
export default function Login() {
	const router = useRouter();
	const [employeeId, setEmployeeId] = useState("");
	const [password, setPassword] = useState("");

	async function handleFacultyLogin(e) {
		e.preventDefault();

		console.log(e);
		console.log({ employeeId, password });

		let response = await fetch(`${API_URL}/faculty/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ empId: employeeId, password }),
		});
		let data = await response.json();

		setAuthToken(data.token);
	}
	return (
		<>
			<h1>Faculty Login</h1>

			<form onSubmit={handleFacultyLogin}>
				<div className="flex flex-col m-2 space-y-5">
					<input
						type="text"
						placeholder="Employee Id"
						className="input input-bordered w-full max-w-xs"
						value={employeeId}
						min={5}
						max={5}
						onChange={(e) => setEmployeeId(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="input input-bordered w-full max-w-xs"
						value={password}
						min={8}
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
