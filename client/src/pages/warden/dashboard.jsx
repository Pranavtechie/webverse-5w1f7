"use client";

import { useEffect, useState } from "react";
import { API_URL, getAuthToken } from "@/constants";

export default function Dashboard() {
	let [wardenDetails, setWardenDetails] = useState({});

	useEffect(() => {
		async function networkRequestMe() {
			let response = await fetch(`${API_URL}/warden/me/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${getAuthToken()}`,
				},
			});

			let wardenData = await response.json();
			setWardenDetails(wardenData.data);
		}
		// Initiate Network Request
		networkRequestMe();
	});

	return (
		<>
			<h1>Warden Dashboard</h1>

			<a
				className="w-16 h-12 px-3 py-2 rounded-md bg-slate-700"
				href="/warden/leave"
			>
				Manage Leaves
			</a>

			<a
				className="w-16 h-12 px-3 py-2 rounded-md bg-slate-700"
				href="/warden/complaints"
			>
				Manage Complaints
			</a>

			<a
				className="w-16 h-12 px-3 py-2 rounded-md bg-slate-700"
				href="/warden/rooms"
			>
				Manage Rooms
			</a>

			<a
				className="w-16 h-12 px-3 py-2 rounded-md bg-slate-700"
				href="/warden/mess"
			>
				Manage Mess
			</a>
		</>
	);
}
