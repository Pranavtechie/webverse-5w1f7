import { useEffect, useState } from "react";
import { API_URL, getAuthToken } from "@/constants";
export default function Dashboard() {
	let [wardenDetails, setWardenDetails] = useState({});
	let [studentDetails, setStudentDetails] = useState({});

	useEffect(() => {
		async function networkRequest() {
			let response = await fetch(`${API_URL}/student/me/my-warden`, {
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
		networkRequest();
	}, []);

	useEffect(() => {
		async function networkRequestMe() {
			let response = await fetch(`${API_URL}/student/me/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${getAuthToken()}`,
				},
			});

			let studentData = await response.json();
			setStudentDetails(studentData?.data);
		}
		// Initiate Network Request
		networkRequestMe();
	}, []);

	return (
		<>
			<h1>Student Dashboard</h1>

			<a
				className="w-16 h-12 px-3 py-2 rounded-md bg-slate-700"
				href="/student/leave"
			>
				Manage Leaves
			</a>

			<div className="border-2 border-gray-800 max-w-fit p-3">
				<h3>Warden Details</h3>
				<p>Name: {wardenDetails?.name}</p>
				<p>Block: {wardenDetails?.block}</p>
			</div>

			<div className="border-2 border-gray-800 max-w-fit p-3">
				<h3>Current Stats</h3>
				<p>Complaints : {studentDetails.complaint?.length || 0}</p>
				<p>Leaves : {studentDetails.leave?.length || 0}</p>
			</div>
		</>
	);
}
