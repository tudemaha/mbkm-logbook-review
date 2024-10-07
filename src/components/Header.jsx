import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
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
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
