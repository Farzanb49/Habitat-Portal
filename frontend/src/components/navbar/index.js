import logo from "../../images/6234b2475c8816c7bbc9d9a5.png";
import {
    Button,
    Popover,
    OverlayTrigger,
    Image,
    Row,
    Col,
  } from "react-bootstrap";
import { render } from "@testing-library/react";
const React = require("react");
const { Navbar, Nav, NavDropdown, Container } = require("react-bootstrap");


const MyNav = () => {
    render(); {
        const popover = (
            <Popover id="popover-basic">
            <Popover.Header as="h3">Criteria</Popover.Header>
            <Popover.Body>
                <ul style={{ fontSize: "14px" }}>
                <li>Have a combined annual family income of less than $90000</li>
                <li>
                    Complete the pre-eligibility questionnaire that can be found <a href = "https://habitatgta.formstack.com/forms/short_master?hgta_tracking=hgta_web%20_blank" style = {{color: "#000"}}>here</a>
                </li>
                <li>
                    Meet the minimum eligible requirements that can be found <a href = "https://habitatgta.ca/homeownership/homeownership-requirements/#1610426542186-eeea34a3-a4b9" style = {{color: "#000"}}>here</a>, including being the legal guardian of one or more children under 16. 
                </li>
                <li>Attend your local Habitat for Humanity information session</li>
                <li>Have 3+ years of employment</li>
                </ul>
            </Popover.Body>
            </Popover>
        );
    return (
        <Navbar expand="lg">
        <Container>
            <Navbar.Brand href="/">
            <img
                src={logo}
                width="34"
                height="34"
                className="d-inline-block align-top"
                alt=""
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">
                <span style={{ color: "#000" }}>Home</span>
                </Nav.Link>
                <Nav.Link href="/application">
                <span style={{ color: "#000" }}>Application</span>
                </Nav.Link>
                <Nav.Link href="/admin">
                <span style={{ color: "#000" }}>Admin</span>
                </Nav.Link>
                <span style={{ color: "#000" }}>
                <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                >
                <Nav.Link href="">
                <span style={{ color: "#000" }}>Criteria</span>
                </Nav.Link>
                </OverlayTrigger>
                </span>
                <Nav.Link href="https://github.com/Farzanb49/Habitat-Portal">
                <span style={{ color: "#000" }}>Github Source</span>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    }
}

export default MyNav;