import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";

export default function Register() {
	const router = useRouter();
	const [dataInput, setDataInput] = useState({
		name: "",
		regNo: "",
		block: "",
		password: "",
		roomNo: "",
	});

	async function handleStudentLogin(e) {
		e.preventDefault();

		console.log(e);
		console.log(dataInput);

		let response = await fetch(`${API_URL}/student/auth/register`, {
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
			<h1>Login Page</h1>
			{/*  
			<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  			<div class="sm:mx-auto sm:w-full sm:max-w-md">*/}
			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form onSubmit={handleStudentLogin}>
				<div className="flex flex-col m-2 space-y-5">
					<input
						type="text"
						placeholder="Name"
						className="input input-bordered w-full max-w-xs"
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
						placeholder="Register Number"
						className="input input-bordered w-full max-w-xs"
						value={dataInput.regNo}
						min={9}
						onChange={(event) => {
							setDataInput((d) => {
								return {
									...d,
									regNo: event.target.value,
								};
							});
						}}
					/>

					<input
						type="text"
						placeholder="Hostel Block Eg: A, B, C"
						className="input input-bordered w-full max-w-xs"
						value={dataInput.block}
						onChange={(event) => {
							setDataInput((d) => {
								return {
									...d,
									block: event.target.value,
								};
							});
						}}
					/>

					<input
						type="password"
						placeholder="Password"
						className="input input-bordered w-full max-w-xs"
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

					<input
						type="text"
						placeholder="Room No"
						className="input input-bordered w-full max-w-xs"
						value={dataInput.roomNo}
						onChange={(event) => {
							setDataInput((d) => {
								return {
									...d,
									roomNo: event.target.value,
								};
							});
						}}
					/>

					<input
						type="submit"
						className="btn btn-primary"
						value="Register"
					/>
				</div>
			</form>
			</div>
			</div>
		</>
	);
}
