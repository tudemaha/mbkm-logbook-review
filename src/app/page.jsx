"use client";

import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getJsonItem } from "./utils/localStorage";

export default function Index() {
	const router = useRouter();

	const [mentees, setMentees] = useState([]);
	const [program, setProgram] = useState("");

	useEffect(() => {
		const user = getJsonItem("logrev-user");
		if (!user) {
			router.push("/login");
			return;
		}

		setProgram(user.program_name);

		const response = axios.get("/api/mentees?programId=" + user.program_id, {
			headers: {
				Authorization: user.access,
			},
		});

		response
			.then((res) => {
				setMentees(res.data.data);
			})
			.catch((err) => {
				localStorage.removeItem("logrev-user");
				if (err.response.status === 401) {
					router.push("/login");
				}
			});
	}, [router]);

	return (
		<>
			<Header />
			<Container className="mt-5 pt-4">
				<Row className="justify-content-center">
					<h3 className="text-center">Mentee List</h3>
					<h4 className="text-center mb-4">{program}</h4>
					<Col>
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
												<Badge bg="primary" pill>
													1
												</Badge>
											</td>
											<td>
												<Badge bg="warning" pill>
													0
												</Badge>
											</td>
											<td>
												<Badge bg="success" pill>
													1
												</Badge>
											</td>
											<td>
												<Badge bg="danger" pill>
													0
												</Badge>
											</td>
											<td>
												<Button
													variant="dark"
													size="sm"
													className="badge rounded-pill"
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
