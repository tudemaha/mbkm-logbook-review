import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";

function Header() {
	const router = useRouter();
	const path = usePathname();

	const [name, setName] = useState("");
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem("logrev-user");
		if (user) {
			const userParse = JSON.parse(user);
			setName(userParse.name);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("logrev-user");
		router.push("/login");
	};

	return (
		<Navbar
			bg="dark"
			data-bs-theme="dark"
			expand="lg"
			className="bg-body-tertiary"
			fixed="top"
		>
			<Container>
				<Navbar.Brand href="/">LogRev</Navbar.Brand>
				{path !== "/login" ? (
					<>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ms-auto">
								<NavDropdown title={name} id="basic-nav-dropdown">
									<NavDropdown.Item onClick={() => setShowModal(true)}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
						<SubmitModal
							title="Logout?"
							body="You will be logged out."
							button_text="Logout"
							show={showModal}
							onHide={() => setShowModal(false)}
							onSubmit={handleLogout}
						/>
					</>
				) : null}
			</Container>
		</Navbar>
	);
}

export default Header;
