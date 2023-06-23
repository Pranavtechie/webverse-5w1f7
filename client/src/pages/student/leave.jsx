"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL, getAuthToken } from "@/constants";
import Table from "@/components/Table";

export default function Leave() {
	const [newLeaveData, setNewLeaveData] = useState({
		leaveType: "parent",
		leaveDate: "",
		leaveTime: "",
		leaveDuration: "",
	});
	const leaveSchema = useMemo(
		() => [
			{
				Header: "Leave Date",
				accessor: "leaveDate",
			},
			{
				Header: "Type of Leave",
				accessor: "leaveType",
			},
			{
				Header: "Leave Duration",
				accessor: "LeaveDuration",
			},
			{
				Header: "Leave Time",
				accessor: "leaveTime",
			},
			{
				Header: "Actions",
				accessor: "actions",
				Cell: (props) => {
					return (
						<div>
							<button
								className="btn btn-warning mr-2"
								onClick={() => handleEdit(props.row.original)}
							>
								Edit
							</button>
							<button
								className="btn btn-error"
								onClick={() => handleDelete(props.row.original)}
							>
								Delete
							</button>
						</div>
					);
				},
			},
		],
		[]
	);
	const [leaveData, setLeaveData] = useState([]);
	const leaveRef = useRef();
	const leaveEditRef = useRef();
	const [editLeaveData, setEditLeaveData] = useState({
		leaveID: "",
		leaveType: "",
		leaveDate: "",
		leaveTime: "",
		leaveDuration: "",
	});

	async function editForLeave() {
		let response = await fetch(`${API_URL}/student/leave/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getAuthToken()}`,
			},
			body: JSON.stringify({ editLeaveData }),
		});

		let data = await response.json();

		console.log({ editData: data });
	}
	function handleEdit(rowData) {
		console.log(rowData);
		setEditLeaveData({
			leaveID: rowData.id,
			leaveType: rowData.leaveType,
			leaveDate: rowData.leaveDate,
			leaveTime: rowData.leaveTime,
			leaveDuration: rowData.LeaveDuration,
		});

		leaveEditRef.current.showModal();
	}

	async function handleDelete(rowData) {
		let response = await fetch(`${API_URL}/student/leave/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getAuthToken()}`,
			},
			body: JSON.stringify({ leaveID: rowData.id }),
		});

		let data = await response.json();
		console.log({ editData: data });
	}
	// To Fetch the leave data from the server
	useEffect(() => {
		async function fetchDefaultData() {
			let response = await fetch(`${API_URL}/student/leave`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getAuthToken()}`,
				},
			});

			let data = await response.json();

			setLeaveData(data.data);
		}

		fetchDefaultData();
	}, []);

	async function applyForLeave() {
		console.log(newLeaveData);

		let response = await fetch(`${API_URL}/student/leave`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getAuthToken()}`,
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

			<dialog id="my_modal_2" ref={leaveEditRef} className="modal">
				<form method="dialog" className="modal-box">
					<h2 className="text-2xl text-center font-semibold">
						Edit Leave
					</h2>

					<h3 className="text-xl">{editLeaveData.leaveID}</h3>
					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text">
								Choose Leave Type
							</span>
						</label>
						<select
							id="leave-type"
							value={editLeaveData.leaveType}
							className="select select-accent max-w-xs"
							onChange={(event) => {
								setEditLeaveData((d) => {
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
							value={editLeaveData.leaveDate}
							onChange={(e) => {
								setEditLeaveData((d) => {
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
							value={editLeaveData.leaveTime}
							onChange={(e) => {
								setEditLeaveData((d) => {
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
							value={editLeaveData.leaveDuration}
							onChange={(e) => {
								setEditLeaveData((d) => {
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
							onClick={editForLeave}
						>
							Edit Leave Data
						</button>
					</div>
				</form>
			</dialog>

			<Table columns={leaveSchema} data={leaveData} />
		</>
	);
}
