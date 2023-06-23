"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL, getAuthToken } from "@/constants";
import Table from "@/components/Table";

export default function Leave() {
	const [leaveData, setLeaveData] = useState([]);

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
							{props.row.original.isApproved ||
							props.row.original.isRejected ? (
								<>No Action Needed</>
							) : (
								<>
									<button
										className="btn btn-warning mr-2"
										onClick={() =>
											sendApprovedRequest(
												props.row.original
											)
										}
									>
										Approve
									</button>
									<button
										className="btn btn-error"
										onClick={() =>
											sendRejectRequest(
												props.row.original
											)
										}
									>
										Reject
									</button>
								</>
							)}
						</div>
					);
				},
			},
			{
				Header: "Status",
				accessor: "isApproved",
				Cell: (props) => {
					return <>{props.row.original.isApproved ? "✅" : "❌"}</>;
				},
			},
		],
		[]
	);
	useEffect(() => {
		async function fetchDefaultData() {
			let response = await fetch(`${API_URL}/warden/leave`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getAuthToken()}`,
				},
			});

			let data = await response.json();

			console.log({ wardenData: data.data });

			setLeaveData(data.data);
		}

		fetchDefaultData();
	}, []);

	async function sendApprovedRequest(rowData) {
		let response = await fetch(
			`${API_URL}/warden/leave/accept/${rowData.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getAuthToken()}`,
				},
			}
		);

		let data = await response.json();

		console.log({ responseData: data });
	}

	async function sendRejectRequest(rowData) {
		let response = await fetch(
			`${API_URL}/warden/leave/reject/${rowData.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getAuthToken()}`,
				},
			}
		);

		let data = await response.json();

		console.log({ rejectedData: data });
	}
	return (
		<>
			<h1>Warden - Manage Leaves</h1>

			<Table columns={leaveSchema} data={leaveData} />
		</>
	);
}
