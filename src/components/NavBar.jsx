import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

export default function NavBar() {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as="span">Hobby Goal Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={location.pathname} className="me-auto">
                        <Nav.Link as={Link} to="/">Projects</Nav.Link>
                        <Nav.Link as={Link} to="/finished">Finished Projects</Nav.Link>
                        <Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
