"use client";

import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getJsonItem, setJsonItem } from "./utils/localStorage";

export default function Index() {
	const router = useRouter();

	const [mentees, setMentees] = useState([]);
	const [logbooksStats, setLogbooksStats] = useState([]);
	const [program, setProgram] = useState("");

	useEffect(() => {
		let user = getJsonItem("logrev-user");
		if (!user) {
			router.push("/login");
			return;
		}

		setProgram(user.program_name);

		const fetchMentees = async () => {
			try {
				const response = await axios.get(
					"/api/mentees?programId=" + user.program_id,
					{
						headers: {
							Authorization: user.access,
						},
					}
				);
				setMentees(response.data.data);

				console.log(response.data.data[0].activity_id);
				user["activity_id"] = response.data.data[0].activity_id;
				setJsonItem("logrev-user", user);
			} catch (error) {
				localStorage.removeItem("logrev-user");
				if (error.response.status === 401) {
					router.push("/login");
					return;
				}
			}
		};
		fetchMentees();
	}, [router]);

	useEffect(() => {
		const fetchLogbooks = async () => {
			const user = getJsonItem("logrev-user");
			try {
				const response = await Promise.all(
					mentees.map((mentee) => {
						return axios.get(
							"/api/logbooks?penawaranId=" + mentee.id_reg_penawaran,
							{
								headers: {
									Authorization: user.access,
								},
							}
						);
					})
				);
				const menteesMeta = response.map((res) => res.data.meta);
				setLogbooksStats(menteesMeta);
			} catch (error) {
				router.push("/login");
				return;
			}
		};

		fetchLogbooks();
	}, [router, mentees]);

	return (
		<>
			<Header />
			<Container className="mt-5 pt-4">
				<Row className="justify-content-center">
					<h3 className="text-center">Mentee List</h3>
					<h4 className="text-center mb-4">{program}</h4>
					<Col>
						{logbooksStats.length !== 0 ? (
							<Table striped hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Submitted</th>
										<th>Need Review</th>
										<th>Accepted</th>
										<th>Need Revision</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{mentees.map((mentee, i) => {
										return (
											<tr key={mentee.id}>
												<td>{i + 1}</td>
												<td>{mentee.name}</td>
												<td>
													{logbooksStats[i].total - logbooksStats[i].draft ===
													0 ? (
														<Badge ng="primary" pill>
															{logbooksStats[i].total - logbooksStats[i].draft}
														</Badge>
													) : (
														logbooksStats[i].total - logbooksStats[i].draft
													)}
												</td>
												<td>
													{logbooksStats[i].submitted !== 0 ? (
														<Badge bg="warning" pill>
															{logbooksStats[i].submitted}
														</Badge>
													) : (
														logbooksStats[i].submitted
													)}
												</td>
												<td>
													{logbooksStats[i].accepted === 0 ? (
														<Badge bg="success" pill>
															{logbooksStats[i].accepted}
														</Badge>
													) : (
														logbooksStats[i].accepted
													)}
												</td>
												<td>
													{logbooksStats[i].need_revise !== 0 ? (
														<Badge bg="success" pill>
															{logbooksStats[i].need_revise}
														</Badge>
													) : (
														logbooksStats[i].need_revise
													)}
												</td>
												<td>
													<Button
														variant="dark"
														size="sm"
														className="badge rounded-pill"
														href={`/logbooks/${mentee.activity_id}/${mentee.id}`}
													>
														Details
													</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						) : null}
					</Col>
				</Row>
			</Container>
		</>
	);
}
