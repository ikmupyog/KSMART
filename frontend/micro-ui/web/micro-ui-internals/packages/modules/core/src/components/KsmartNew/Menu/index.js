import React from "react";
import { Button, Col, Container, Form, Image, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const styles = {
    roundedButton: {
        "border-radius": "20px"
    },
    logo: { height: 80, width: 80 }
}

const MenuBar = () => {
    const history = useHistory();

    const onLoginClick = () => history.push('/digit-ui/citizen/login');

    return <React.Fragment>
        <Row style={{ textAlign: "center" }}>
            <Col sx={8}>
                <Row>
                    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" style={styles.logo} />
                    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" style={styles.logo} />
                    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" style={styles.logo} />
                </Row>
            </Col>
            <Col sx={4} style={{ textAlign: 'right' }}>
                <Button style={styles.roundedButton} variant="info">Register</Button>
                <Button onClick={onLoginClick} style={styles.roundedButton} variant="success">Login</Button>
            </Col>
        </Row>
        <Row>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Row>
    </React.Fragment>

}

export default MenuBar