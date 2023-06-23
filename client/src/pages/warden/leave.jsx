"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL, getAuthToken } from "@/constants";
import Table from "@/components/Table";

export default function Leave() {
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
		],
		[]
	);
	const [leaveData, setLeaveData] = useState({});
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

	function sendApprovedRequest(rowData) {}

	function sendRejectRequest(rowData) {}
	return (
		<>
			<h1>Warden - Manage Leaves</h1>

			<Table columns={leaveSchema} data={leaveData} />
		</>
	);
}
