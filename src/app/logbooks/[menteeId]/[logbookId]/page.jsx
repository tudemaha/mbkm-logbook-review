"use client";

import { useState } from "react";
import Header from "@/components/Header";
import {
	Row,
	Col,
	Button,
	Badge,
	Container,
	Card,
	Modal,
} from "react-bootstrap";

function VerticalCenterModal(props) {
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="vertical-center-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="vertical-center-modal">Accept Logbook?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Once you accept, your notes or review cannot be editted.</p>
			</Modal.Body>
			<Modal.Footer>
				<Button className="rounded" variant="dark" onClick={props.onAccept}>
					Accept
				</Button>
				<Button className="rounded" variant="light" onClick={props.onHide}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default function LogbookDetail() {
	const [modalShow, setModalShow] = useState(false);

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
					<Col md="6">
						<h5 className="mb-3">Dummy Period</h5>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
							ipsam iste perferendis inventore possimus, fugiat beatae. Ipsum
							magni perspiciatis, hic quaerat aperiam officiis inventore ad
							doloribus veniam est accusamus facere!
						</p>
					</Col>
					<Col md="3">
						<Card>
							<Card.Body>
								<h5 className="mb-4">
									<Badge bg="info" pill>
										n words
									</Badge>
								</h5>
								<p>Do you want to accept the logbook?</p>
								<Button
									variant="dark"
									className="rounded"
									onClick={() => setModalShow(true)}
								>
									Accept Logbook
								</Button>
								<VerticalCenterModal
									show={modalShow}
									onHide={() => setModalShow(false)}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
