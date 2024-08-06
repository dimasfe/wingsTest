import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <Navbar bg="light" variant="light" expand="lg" className="border-bottom" style={{ minWidth: '8vh', minHeight: '8vh', padding: 0 }}>
                <Navbar.Brand className="px-3" as={Link} to="/">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav className="ml-auto px-3">
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container fluid className="p-0">
                <Row className="no-gutters" style={{ minWidth: '92vh', minHeight: '92vh', padding: 0 }}>
                    <Col md={2} className="bg-light p-3 border-end">
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="roles">Roles</Nav.Link>
                            <Nav.Link as={Link} to="tasks">Tasks</Nav.Link>
                            <Nav.Link as={Link} to="users">Users</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={10} className="p-4">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
