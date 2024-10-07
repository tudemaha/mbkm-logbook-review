"use client";

import Header from "@/components/Header";
import { Row, Col, Table, Button, Badge, Container } from "react-bootstrap";

export default function LogbookList() {
	return (
		<>
			<Header />
			<Container className="mt-5 pt-4">
				<Button variant="dark" className="rounded" href="/">
					<i className="bi bi-chevron-left"></i> Back
				</Button>
				<Row className="justify-content-center">
					<h3 className="text-center">Logbook of</h3>
					<h4 className="text-center mb-4">Dummy Name</h4>
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
								<tr>
									<td>Dummy Name</td>
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
									<td>Dummy Name</td>
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
