import React from "react";
import { Button, Col, Container, Form, Image, InputGroup, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const styles = {
    roundedButton: {
        "border-radius": "20px",
        backgroundColor: "#ee3d7f",
        width: 200,
        marginBlock: 20,
        marginRight: 20
    },
    logo: { height: 80, width: 80 }
}

const MenuBar = () => {
    const history = useHistory();

    const onLoginClick = () => history.push('/digit-ui/citizen/login');

    return <React.Fragment>
        <Row style={{ textAlign: "center", paddingTop: '0px' }}>
            <Col sx={8}>
                <Row>
                    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" style={styles.logo} />
                    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" style={styles.logo} />
                    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" style={styles.logo} />
                </Row>
            </Col>
            <Col sx={6} style={{ textAlign: 'right' }}>
                <Button style={styles.roundedButton} size="lg"> <InputGroup><FaUserCircle />Register</InputGroup></Button>
                <Button onClick={onLoginClick} style={styles.roundedButton} size="lg">
                    <InputGroup><FaUserCircle /> Login</InputGroup>
                </Button>
            </Col>
        </Row>
        <Row>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">About Ksmart</Nav.Link>
                            <Nav.Link href="#action1">E Bridge</Nav.Link>
                            <Nav.Link href="#action1">Quick Pay</Nav.Link>
                            <Nav.Link href="#action1">Certificates</Nav.Link>
                        </Nav>
                        <Nav className="d-flex">
                            <Nav.Link href="#action1">Support</Nav.Link>
                            <Nav.Link href="#action1">Translate</Nav.Link>
                            <Button style={{ backgroundColor: 'transparent', color: 'black', border: 0 }}><FaSearch size='fa-lg' /></Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Row>
    </React.Fragment>

}

export default MenuBar