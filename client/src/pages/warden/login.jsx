import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL, setAuthToken } from "@/constants";
export default function Login() {
	const router = useRouter();
	const [blockNo, setBlockNo] = useState("");
	const [password, setPassword] = useState("");

	async function handleWardenLogin(e) {
		e.preventDefault();

		console.log(e);
		console.log({ blockNo, password });

		let response = await fetch(`${API_URL}/warden/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ block: blockNo, password }),
		});
		let data = await response.json();

		setAuthToken(data.token);
	}
	return (
		<>
			<h1>Warden Login</h1>

			<form onSubmit={handleWardenLogin}>
				<div className="flex flex-col m-2 space-y-5">
					<input
						type="text"
						placeholder="Block"
						className="input input-bordered w-full max-w-xs"
						value={blockNo}
						min={1}
						max={1}
						onChange={(e) => setBlockNo(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="input input-bordered w-full max-w-xs"
						value={password}
						min={8}
                        max={100}
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
