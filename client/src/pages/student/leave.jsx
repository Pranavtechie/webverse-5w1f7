"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL, getAuthToken } from "@/constants";

export default function Leave() {
	const leaveRef = useRef();

	useEffect(() => {
		console.log("use effect");

		async function fetchDefaultData() {
			let response = await fetch(`${API_URL}/student/leave`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getAuthToken()}`,
				},
			});

			let data = response.json();

			console.log({ data });
		}

		fetchDefaultData();
	}, []);
	return (
		<>
			<h1>Leave Page</h1>
			<button
				className="btn btn-primary "
				onClick={() => leaveRef.current.showModal()}
			>
				Apply for Leave
			</button>

			{/* Open the modal using ID.showModal() method */}
			<dialog id="my_modal_1" ref={leaveRef} className="modal">
				<form method="dialog" className="modal-box">
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">
						Press ESC key or click the button below to close
					</p>
					<div className="modal-action">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn">Close</button>
					</div>
				</form>
			</dialog>
		</>
	);
}
