"use client";

import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import Header from "@/components/Header";

export default function Index() {
	return (
		<>
			<Header />
			<Container className="mt-5 pt-4">
				<Row className="justify-content-center">
					<h3 className="text-center mb-4">Mentee List</h3>
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
								<tr>
									<td>1</td>
									<td>Dummy Name</td>
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
								<tr>
									<td>1</td>
									<td>Dummy Name</td>
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
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
}
