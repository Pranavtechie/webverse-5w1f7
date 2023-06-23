"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL, getAuthToken } from "@/constants";
import Table from "@/components/Table";

export default function Event() {
	const [newEventData, setNewEventData] = useState({
		eventName: "any",
        eventDescription: "any",
        eventDate: "any",
        eventTime: "any",
        eventVenue: "any",
        eventOrganiser: "any",
        participantCount: "any",
        hostedBy: "any",
        eventPoster: "any"
	});

	const eventSchema = useMemo(
		() => [
			{
				Header: "Event Date",
				accessor: "eventDate",
			},
			{
				Header: "Event Name",
				accessor: "eventName",
			},
			{
				Header: "Event Description",
				accessor: "eventDescription",
			},
			{
				Header: "Event Time",
				accessor: "eventTime",
			},
            {
				Header: "Event Venue",
				accessor: "eventVenue",
			},
            {
				Header: "Event Organiser",
				accessor: "eventOrganiser",
			},
            {
				Header: "Participant Count",
				accessor: "participantCount",
			},
            {
				Header: "Hosted By",
				accessor: "hostedBy",
			},
            {
				Header: "Event Poster",
				accessor: "eventPoster",
			},
			
		],
		[]
	);

	const [eventData, setEventData] = useState([]);
	const eventRef = useRef();
	const eventEditRef = useRef();
	const [editEventData, setEditEventData] = useState({
		eventName: "",
        eventDescription: "",
        eventDate: "",
        eventTime: "",
        eventVenue: "",
        eventOrganiser: "",
        participantCount: "",
        hostedBy: "",
        eventPoster: "",
	});

	async function applyForEvent() {
		console.log(newEventData);

		let response = await fetch(`${API_URL}/student/event`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getAuthToken()}`,
			},
			body: JSON.stringify(newEventData),
		});

		let data = await response.json();
		console.log({ data });
	}

	return (
		<>
			<h1>Events Page</h1>
			<button
				className="btn btn-primary "
				onClick={() => eventRef.current.showModal()}
			>
				Apply for Event
			</button>

			<dialog id="my_modal_1" ref={eventRef} className="modal">
				<form method="dialog" className="modal-box">
					<h2 className="text-2xl text-center font-semibold">
						Apply for Event
					</h2>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Event Name
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="event-name"
							value={newEventData.eventName}
							onChange={(e) => {
								setNewEventData((d) => {
									return {
										...d,
										eventName: e.target.value,
									};
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Event Description
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="event-description"
							value={newEventData.eventDescription}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, eventDescription: e.target.value };
								});
							}}
						/>
					</div>

					<div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Event Date
							</span>
						</label>
						<input
							type="date"
							className="input input-accent"
							id="event-date"
							value={newEventData.eventData}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, eventData: e.target.value };
								});
							}}
						/>
					</div>

                    <div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Event Time
							</span>
						</label>
						<input
							type="time"
							className="input input-accent"
							id="event-time"
							value={newEventData.eventTime}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, eventTime: e.target.value };
								});
							}}
						/>
					</div>

                    <div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Event Venue
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="event-venue"
							value={newEventData.eventVenue}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, eventVenue: e.target.value };
								});
							}}
						/>
					</div>

                    <div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Event Organiser
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="event-orgainser"
							value={newEventData.eventOrganiser}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, eventOrganiser: e.target.value };
								});
							}}
						/>
					</div>

                    <div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Participant Count
							</span>
						</label>
						<input
							type="number"
							className="input input-accent"
							id="participant-count"
							value={newEventData.participantCount}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, participantCount: e.target.value };
								});
							}}
						/>
					</div>

                    <div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Hoisted By
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="hoisted-by"
							value={newEventData.hoistedBy}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, hoistedBy: e.target.value };
								});
							}}
						/>
					</div>

                    <div className="form-control max-w-xs">
						<label className="label">
							<span className="label-text text-sm mb-0">
								Event Poster
							</span>
						</label>
						<input
							type="text"
							className="input input-accent"
							id="event-poster"
							value={newEventData.eventPoster}
							onChange={(e) => {
								setNewEventData((d) => {
									return { ...d, eventPoster: e.target.value };
								});
							}}
						/>
					</div>

					<div className="modal-action">
						<button
							className="btn btn-primary"
							onClick={applyForEvent}
						>
							Apply for Event
						</button>
					</div>
				</form>
			</dialog>
			
			<Table columns={eventSchema} data={eventData} />
		</>
	);
}
