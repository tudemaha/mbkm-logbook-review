import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
	const path = usePathname();

	const [name, setName] = useState("");

	useEffect(() => {
		const user = localStorage.getItem("logrev-user");
		if (user) {
			const userParse = JSON.parse(user);
			setName(userParse.name);
		}
	}, []);

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
									<NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</>
				) : null}
			</Container>
		</Navbar>
	);
}

export default Header;
