import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";

export default function Register() {
	const forgetRef = useRef(); 
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
			
			{/*  
			<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  			<div class="sm:mx-auto sm:w-full sm:max-w-md">*/}
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
		<div className="flex justify-center">
			<h1 className="text-xl text-gray-800 font-bold">Student Registration</h1>
		</div>
			<form onSubmit={handleStudentLogin}>
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
						placeholder="Register Number"
						className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
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
						className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
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

					<input
						type="text"
						placeholder="Room No"
						className="input input-bordered w-full text-[#c084fc] mx-auto max-w-xs"
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
<dialog id="my_modal_3" className="modal" ref={forgetRef}>
  <form method="dialog" className="modal-box max-w-sm text-white">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <h3 className="font-bold text-lg">Hey there!</h3>
    <p className="py-4">Contact the SDC to reset your password</p>
  </form>
</dialog>
					<div id="alertForForgotPassword">
						<button type="button" className="text-gray-700 flex " onClick={() => forgetRef.current.showModal()}>Forgot Password</button>
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
