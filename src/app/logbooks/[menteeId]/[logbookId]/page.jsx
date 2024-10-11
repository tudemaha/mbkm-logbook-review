"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SubmitModal from "@/components/SubmitModal";
import { Row, Col, Button, Badge, Container, Card } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { getJsonItem } from "@/app/utils/localStorage";
import axios from "axios";

export default function LogbookDetail() {
	const router = useRouter();
	const { menteeId, logbookId } = useParams();

	const [modalShow, setModalShow] = useState(false);
	const [logbook, setLogbook] = useState({});
	const [mentee, setMentee] = useState({});

	useEffect(() => {
		const user = getJsonItem("logrev-user");
		if (!user) {
			router.push("/login");
			return;
		}

		const fetchMentee = async () => {
			try {
				const res = await axios.get(
					`/api/mentees/${menteeId}?activityId=${user.activity_id}`,
					{
						headers: {
							Authorization: user.access,
						},
					}
				);
				setMentee(res.data.data);
			} catch (error) {
				if (error.response.status === 400) {
					router.push("/404");
				}
				if (error.response.status === 401) {
					router.push("/login");
					return;
				}
			}
		};
		fetchMentee();
	}, [menteeId, router]);

	useEffect(() => {
		const user = getJsonItem("logrev-user");

		const fetchLogbook = async () => {
			if (mentee.id) {
				try {
					const res = await axios.get(`/api/logbooks/${logbookId}`, {
						headers: {
							Authorization: user.access,
						},
					});

					setLogbook(res.data.data);
				} catch (error) {
					if (error.response.status === 400) {
						router.push("/404");
					}
					if (error.response.status === 401) {
						router.push("/login");
						return;
					}
				}
			}
		};

		fetchLogbook();
	}, [router, mentee, logbookId]);

	const handleAccept = async () => {
		const user = getJsonItem("logrev-user");

		try {
			const res = await axios.post(
				"/api/logbooks/" + logbook.id,
				{
					current_state: "SUBMITTED",
					event: "Accept",
					notes: "",
				},
				{
					headers: {
						Authorization: user.access,
					},
				}
			);
			let newLogbook = { status: res.data.data.status, ...logbook };
			setLogbook(newLogbook);
		} catch (error) {
			if (error.response.status === 401) {
				router.push("/login");
				return;
			}
		} finally {
			setModalShow(false);
			router.refresh();
		}
	};

	return (
		<>
			<Header />

			<Container className="mt-5 pt-4">
				<Button
					variant="dark"
					className="rounded"
					href={`/logbooks/${menteeId}`}
				>
					<i className="bi bi-chevron-left"></i> Back
				</Button>
				<Row className="justify-content-center">
					<h3 className="text-center">Logbook of</h3>
					<h4 className="text-center mb-4">{mentee.name}</h4>
					{Object.keys(logbook).length !== 0 ? (
						<>
							<Col md="6">
								<h5>{`${logbook.start_date} - ${logbook.end_date}`}</h5>
								<p className="mb-3">
									Submitted: {logbook.submitted_at.substring(0, 10)}
								</p>
								<p
									dangerouslySetInnerHTML={{
										__html: logbook.report_text.replace(/\n/g, "<br />"),
									}}
								></p>
							</Col>
							<Col md="3">
								<Card className="sticky-top">
									<Card.Body>
										<h5 className="mb-4">
											<Badge bg="info" pill>
												{logbook.report_text.trim().split(/\s+/).length} words
											</Badge>
										</h5>
										<p>Do you want to accept the logbook?</p>
										<Button
											variant={
												logbook.status === "ACCEPTED" ? "success" : "dark"
											}
											className="rounded"
											onClick={() => setModalShow(true)}
											disabled={logbook.status === "ACCEPTED" ? true : false}
										>
											{logbook.status !== "ACCEPTED"
												? "Accept Logbook"
												: "Already Accepted"}
										</Button>
										{logbook.status !== "ACCEPTED" ? (
											<SubmitModal
												title="Accept Logbook?"
												body="Once you accept, your notes or review cannot be editted."
												button_text="Accept"
												show={modalShow}
												onHide={() => setModalShow(false)}
												onSubmit={handleAccept}
											/>
										) : null}
									</Card.Body>
								</Card>
							</Col>
						</>
					) : null}
				</Row>
			</Container>
		</>
	);
}
