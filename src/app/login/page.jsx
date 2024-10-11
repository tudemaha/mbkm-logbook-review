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
import { useEffect, useState } from "react";
import axios from "axios";
import decodeToken from "./decodeToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { getJsonItem } from "../utils/localStorage";

export default function Login() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const user = getJsonItem("logrev-user");
		if (user) {
			router.push("/");
			return;
		}
	}, [router]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		try {
			setShowAlert(false);

			const authRes = await axios.post("/api/auth", { email, password });

			const { access_token, refresh_token } = authRes.data.data;
			let decodedToken = decodeToken(access_token);
			decodedToken["email"] = email;
			decodedToken["access"] = access_token;
			decodedToken["refresh"] = refresh_token;

			const programRes = await axios.get("/api/programs", {
				headers: {
					Authorization: access_token,
				},
			});
			const { program_id, name } = programRes.data.data[0];
			decodedToken["program_id"] = program_id;
			decodedToken["program_name"] = name;

			localStorage.setItem("logrev-user", JSON.stringify(decodedToken));

			router.push("/");
		} catch (err) {
			const errorMessage = err.response.data.error.message;

			setError(`Unknown error occured: ${errorMessage}`);
			setPassword("");
			setShowAlert(true);
		} finally {
			setLoading(false);
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
										{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}{" "}
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
