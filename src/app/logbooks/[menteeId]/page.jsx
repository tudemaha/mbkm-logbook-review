"use client";

import { getJsonItem } from "@/app/utils/localStorage";
import Header from "@/components/Header";
import axios from "axios";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Row, Col, Table, Button, Badge, Container } from "react-bootstrap";

export default function LogbookList() {
	const router = useRouter();
	const { menteeId } = useParams();

	const [mentee, setMentee] = useState({});
	const [logbooks, setLogbooks] = useState([]);

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

		const fetchLogbooks = async () => {
			try {
				if (mentee.id_reg_penawaran) {
					const res = await axios.get(
						`/api/logbooks?penawaranId=${mentee.id_reg_penawaran}`,
						{
							headers: {
								Authorization: user.access,
							},
						}
					);
					setLogbooks(res.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					router.push("/login");
					return;
				}
			}
		};
		fetchLogbooks();
	}, [router, mentee, menteeId]);

	return (
		<>
			<Header />
			<Container className="mt-5 pt-4">
				<Button variant="dark" className="rounded" href="/">
					<i className="bi bi-chevron-left"></i> Back
				</Button>
				<Row className="justify-content-center">
					<h3 className="text-center">Logbook of</h3>
					<h4 className="text-center mb-4">{mentee.name}</h4>
					<Col md="8">
						<Table striped hover>
							<thead>
								<tr>
									<th>Period</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{logbooks.map((logbook) => {
									return (
										<tr key={logbook.id}>
											<td>{`${logbook.start_date} - ${logbook.end_date}`}</td>
											<td>
												<Badge
													bg={
														logbook.status === "DRAFT"
															? "primary"
															: logbook.status === "SUBMITTED"
															? "warning"
															: logbook.status === "ACCEPTED"
															? "success"
															: "danger"
													}
													pill
												>
													{logbook.status}
												</Badge>
											</td>
											<td>
												<Button
													variant="dark"
													size="sm"
													className="badge rounded-pill"
													href={`/logbooks/${menteeId}/${logbook.id}`}
												>
													Details
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
}
