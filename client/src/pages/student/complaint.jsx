"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL, getAuthToken } from "@/constants";
import Table from "@/components/Table";

export default function Complaint() {
	const [newComplaintData, setNewComplaintData] = useState({
		complaintType: "Electrical",
		complaintDate: "",
		complaintSeverity: "",
		complaintDescription: "",
	});

	const complaintSchema = useMemo(
		() => [
			{
				Header: "Complaint Date",
				accessor: "complaintDate",
			},
			{
				Header: "Type of Complaint",
				accessor: "complaintType",
			},
			{
				Header: "Complaint Description",
				accessor: "complaintDescription",
			},
			{
				Header: "Complaint Severity",
				accessor: "complaintSeverity",
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

	const [complaintData, setComplaintData] = useState([]);
	const complaintRef = useRef();
	const complaintEditRef = useRef();
	const [editComplaintData, setEditComplaintData] = useState({
		complaintID: "",
		complaintType: "",
		complaintDate: "",
		complaintDescription: "",
		complaintSeverity: "",
	});

	async function editForComplaint() {
		let response = await fetch(`${API_URL}/student/complaint/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getAuthToken()}`,
			},
			body: JSON.stringify({ editComplaintData }),
		});

		let data = await response.json();

		console.log({ editData: data });
	}

	function handleEdit(rowData) {
		console.log(rowData);
		setEditComplaintData({
			complaintID: rowData.id,
			complaintType: rowData.complaintType,
			complaintDate: rowData.complaintDate,
			complaintDescription: rowData.complaintDescription,
			complaintSeverity: rowData.complaintSeverity,
		});

		complaintEditRef.current.showModal();
	}

	async function handleDelete(rowData) {
		let response = await fetch(`${API_URL}/student/complaint/`, {
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

	useEffect(() => {
		async function fetchDefaultData() {
			let response = await fetch(`${API_URL}/student/complaint`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getAuthToken()}`,
				},
			});

			let data = await response.json();

			setComplaintData(data.data);
		}

		fetchDefaultData();
	}, []);

	async function applyForComplaint() {
		console.log(newComplaintData);

		let response = await fetch(`${API_URL}/student/complaint`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getAuthToken()}`,
			},
			body: JSON.stringify(newComplaintData),
		});

		let data = await response.json();
		console.log({ data });
	}

	return (
		<>
			<h1>Complaints Page</h1>
			<button
				className="btn btn-primary "
				onClick={() => complaintRef.current.showModal()}
			>
				Apply for Complaint
			</button>

			<dialog id="my_modal_1" ref={complaintRef} className="modal">
				<form method="dialog" className="modal-box">
					<h2 className="text-2xl text-center font-semibold">
						Apply for Complaint
					</h2>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text">
								Select Complaint Type
							</span>
						</label>
						<select
							id="complaint-type"
							value={newComplaintData.complaintType}
							className="select select-accent max-w-xs"
							onChange={(event) => {
								setNewComplaintData((d) => {
									return {
										...d,
										complaintType: event.target.value,
									};
								});
							}}
						>
							<option value="electrical">w/ Electrical</option>
							<option value="plumbing">Pumbing</option>
							<option value="hostel">Hostel</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Complaint Date
							</span>
						</label>
						<input
							type="date"
							className="input input-accent"
							id="complaint-date"
							value={newComplaintData.complaintDate}
							onChange={(e) => {
								setNewComplaintData((d) => {
									return {
										...d,
										complaintDate: e.target.value,
									};
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Complaint Description
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="complaint-description"
							value={newComplaintData.complaintDescription}
							onChange={(e) => {
								setNewComplaintData((d) => {
									return { ...d, complaintDescription: e.target.value };
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text">
								Select Complaint Severity
							</span>
						</label>
						<select
							id="complaint-severity"
							value={newComplaintData.complaintSeverity}
							className="select select-accent max-w-xs"
							onChange={(event) => {
								setNewComplaintData((d) => {
									return {
										...d,
										complaintSeverity: event.target.value,
									};
								});
							}}
						>
							<option value="low">w/ Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>

					<div className="modal-action">
						<button
							className="btn btn-primary"
							onClick={applyForComplaint}
						>
							Apply for Complaint
						</button>
					</div>
				</form>
			</dialog>
			<dialog id="my_modal_2" ref={complaintEditRef} className="modal">
				<form method="dialog" className="modal-box">
					<h2 className="text-2xl text-center font-semibold">
						Edit Complaint
					</h2>

					<h3 className="text-xl">{editComplaintData.complaintID}</h3>
					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text">
								Choose Complaint Type
							</span>
						</label>
						<select
							id="complaint-type"
							value={editComplaintData.complaintType}
							className="select select-accent max-w-xs"
							onChange={(event) => {
								setEditComplaintData((d) => {
									return {
										...d,
										complaintType: event.target.value,
									};
								});
							}}
						>
							<option value="electrical">w/ Electrical</option>
							<option value="plumbing">Plumbing</option>
							<option value="hostel">Hostel</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Complaint Date
							</span>
						</label>
						<input
							type="date"
							className="input input-accent"
							id="complaint-date"
							value={editComplaintData.complaintDate}
							onChange={(e) => {
								setEditComplaintData((d) => {
									return {
										...d,
										complaintDate: e.target.value,
									};
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Complaint Description
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="complaint-description"
							value={editComplaintData.complaintDescription}
							onChange={(e) => {
								setEditComplaintData((d) => {
									return { ...d, complaintDescription: e.target.value };
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text">
								Choose Complaint Severity
							</span>
						</label>
						<select
							id="complaint-severity"
							value={editComplaintData.complaintSeverity}
							className="select select-accent max-w-xs"
							onChange={(event) => {
								setEditComplaintData((d) => {
									return {
										...d,
										complaintSeverity: event.target.value,
									};
								});
							}}
						>
							<option value="low">w/ Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>

					<div className="modal-action">
						<button
							className="btn btn-primary"
							onClick={editForComplaint}
						>
							Edit Complaint Data
						</button>
					</div>
				</form>
			</dialog>

			<Table columns={complaintSchema} data={complaintData} />
		</>
	);
}
