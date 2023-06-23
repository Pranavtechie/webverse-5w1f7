import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";

export default function Register() {
	const forgetRef = useRef();
	const router = useRouter();
	const [dataInput, setDataInput] = useState({
		name: "",
		empId: "",
		password: "",
		isHOD: "",
	});

	async function handleFacultyLogin(e) {
		e.preventDefault();

		console.log(e);
		console.log(dataInput);

		let response = await fetch(`${API_URL}/faculty/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataInput),
		});

		console.log(response);

		let data = await response.json();

		console.log({ data });
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
							Faculty Registration
						</h1>
					</div>
					<form onSubmit={handleFacultyLogin}>
						<div className="flex flex-col m-2 space-y-5">
							<input
								type="text"
								placeholder="Name"
								className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
								value={dataInput.name}
								min={3}
								onChange={(event) => {
									setDataInput((d) => {
										return {
											...d,
											name: event.target.value,
										};
									});
								}}
							/>

							<input
								type="text"
								placeholder="Employee ID"
								className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
								value={dataInput.empId}
								min={5}
								max={5}
								onChange={(event) => {
									setDataInput((d) => {
										return {
											...d,
											empId: event.target.value,
										};
									});
								}}
							/>

							<input
								type="password"
								placeholder="Password"
								className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
								value={dataInput.password}
								min={8}
								onChange={(event) => {
									setDataInput((d) => {
										return {
											...d,
											password: event.target.value,
										};
									});
								}}
							/>
							<div className="flex justify-center">
								<input
									type="checkbox"
									class="checkbox"
									value={dataInput.isHOD}
									onChange={(event) => {
										setDataInput((d) => {
											return {
												...d,
												isHOD: event.target.checked,
											};
										});
									}}
								/>
								<label className="content-align"> HOD?</label>
							</div>
							<input
								type="submit"
								className="btn btn-primary hover:bg-[#e0f2fe] hover:text-black bg-[#0c4a6e] mx-auto max-w-xs text-gray-200"
								value="Register"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
