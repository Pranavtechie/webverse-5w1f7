"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL, getAuthToken } from "@/constants";

export default function Leave() {
	const [newLeaveData, setNewLeaveData] = useState({
		leaveType: "",
		leaveDate: "",
		leaveTime: "",
		leaveDuration: "",
	});
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

	async function applyForLeave() {
		console.log(newLeaveData);

		let response = await fetch(`${API_URL}/student/leave`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getAuthToken()}`,
			},
			body: JSON.stringify(newLeaveData),
		});

		let data = await response.json();
		console.log({ data });
	}
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
					<h2 className="text-2xl text-center font-semibold">
						Apply for Leave
					</h2>

					{/* Select Leave Type Input */}
					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text">
								Select Leave Type
							</span>
						</label>
						<select
							id="leave-type"
							value={newLeaveData.leaveType}
							className="select select-accent max-w-xs"
							onChange={(event) => {
								setNewLeaveData((d) => {
									return {
										...d,
										leaveType: event.target.value,
									};
								});
							}}
						>
							<option value="parent">w/ Parent Leave</option>
							<option value="outing">Outing</option>
							<option value="home-town">Home Town</option>
						</select>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Leave Date
							</span>
						</label>
						<input
							type="date"
							className="input input-accent"
							id="leave-date"
							value={newLeaveData.leaveDate}
							onChange={(e) => {
								setNewLeaveData((d) => {
									return {
										...d,
										leaveDate: e.target.value,
									};
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Leave Time
							</span>
						</label>
						<input
							type="time"
							className="input input-accent"
							id="leave-time"
							value={newLeaveData.leaveTime}
							onChange={(e) => {
								setNewLeaveData((d) => {
									return { ...d, leaveTime: e.target.value };
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Leave Duration
							</span>
						</label>
						<input
							type="number"
							className="input input-accent"
							id="duration"
							value={newLeaveData.leaveDuration}
							onChange={(e) => {
								setNewLeaveData((d) => {
									return {
										...d,
										leaveDuration: e.target.value,
									};
								});
							}}
						/>
					</div>

					<div className="modal-action">
						<button
							className="btn btn-primary"
							onClick={applyForLeave}
						>
							Apply for Leave
						</button>
					</div>
				</form>
			</dialog>
		</>
	);
}
