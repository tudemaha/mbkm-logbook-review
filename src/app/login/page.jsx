"use client";

import {
	Card,
	Col,
	Container,
	Form,
	Row,
	Button,
	FloatingLabel,
	Alert,
} from "react-bootstrap";
import Header from "@/components/Header";
import { useState } from "react";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// const endpoint = import.meta.env.VITE_API_ENDPOINT;
		// console.log(endpoint);
		// const path = "/v1alpha1/mentors/login";

		try {
			const response = await axios.post("http://localhost:8080");

			console.log(response);
		} catch (error) {
			setError(`Unknown error occured: ${error}`);
		}
	};

	return (
		<>
			<Header />
			<Container>
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg="5">
						<Card>
							<Card.Body>
								<Card.Title className="mb-4 text-center fw-bold fs-3">
									Login
								</Card.Title>
								{showAlert ? (
									<Alert
										variant="danger"
										onClose={() => setShowAlert(false)}
										dismissible
									>
										{error}
									</Alert>
								) : null}
								<Form className="d-grid" onSubmit={handleSubmit}>
									<FloatingLabel
										controlId="floatingEmail"
										label="Email"
										className="mb-3"
									>
										<Form.Control
											type="email"
											placeholder="Enter email"
											name="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											autoFocus
											required
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingPassword"
										label="Password"
										className="mb-3"
									>
										<Form.Control
											type="password"
											placeholder="Password"
											name="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</FloatingLabel>
									<Button variant="dark" type="submit" className="mt-3">
										Login
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
