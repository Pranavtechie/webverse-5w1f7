import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { API_URL, setAuthToken } from "@/constants";

export default function Login() {
	const forgetRef = useRef();
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
			body: JSON.stringify({ regNo: registerNumber, password }),
		});
		let jsonResponse = await response.json();

		setAuthToken(jsonResponse.token);

		if (response.status === 200) {
			router.push("/student/dashboard");
		}
	}
	return (
		<>
			<div className="navbar bg-base-300">
				<a className="btn btn-ghost normal-case text-xl">WebVerse</a>
			</div>
			<div className="navbar bg-base-200"></div>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="flex justify-center">
						<h1 className="text-xl text-gray-800 font-bold">
							Student Login
						</h1>
					</div>

					<form onSubmit={handleStudentLogin}>
						<div className="flex flex-col m-2 space-y-5">
							<input
								type="text"
								placeholder="Register Number"
								className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
								value={registerNumber}
								min={9}
								max={9}
								onChange={(e) =>
									setRegisterNumber(e.target.value)
								}
							/>
							<input
								type="password"
								placeholder="Password"
								className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
								value={password}
								min={8}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div id="alertForForgotPassword">
								<button
									type="button"
									className="text-gray-700 flex "
									onClick={() =>
										forgetRef.current.showModal()
									}
								>
									Forgot Password
								</button>
							</div>
							<input
								type="submit"
								className="btn btn-primary hover:bg-[#e0f2fe] hover:text-black bg-[#0c4a6e] mx-auto max-w-xs text-gray-200"
								value="Login"
							/>
						</div>
					</form>
				</div>
			</div>
			<dialog id="my_modal_3" className="modal" ref={forgetRef}>
				<form method="dialog" className="modal-box max-w-sm text-white">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
					<h3 className="font-bold text-lg">Hey there!</h3>
					<p className="py-4">
						Contact the SDC to reset your password
					</p>
				</form>
			</dialog>
		</>
	);
}
