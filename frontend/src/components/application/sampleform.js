import { RabbitLegacy } from "crypto-js";
import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";

// page 3/4
class HomeownerApp extends React.Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.submit = this.submit.bind(this);
  }

  back(event) {
    event.preventDefault();
    this.props.prevPage();
  }

  submit(event) {
    event.preventDefault();
    this.props.submitForm();
  }

  render() {
    let buttonDisp;
    let backDisp = (
      <Button
        variant="secondary"
        style={{ background: "#414141" }}
        onClick={this.back}
        className="form-button"
      >
        Previous Page
      </Button>
    );
    if (this.props.values.loadingSigning) {
      buttonDisp = (
        <div>
          <br></br>
          <Button style={{ background: "#008046" }} variant="success" disabled>
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Button>
        </div>
      );
      backDisp = null;
    } else {
      buttonDisp = (
        <Button
          style={{ background: "#008046" }}
          variant="success"
          onClick={this.submit}
          className="form-button"
          type="submit"
        >
          Sign and Submit
        </Button>
      );
    }

    let fillAlert;
    if (this.props.values.showFillAlert) {
      fillAlert = (
        <Alert
          variant="danger"
          onClose={this.props.dismissFillAlert}
          dismissible
        >
          <Alert.Heading>
            Please fill out or fix the following fields:
          </Alert.Heading>
          <ListGroup variant="flush">
            {this.props.values.fieldsNeedFilling.map((field, idx) => (
              <ListGroup.Item variant="danger" key={idx}>
                {field}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Alert>
      );
    }
    return (
      <Row>
        <Col></Col>
        <Col sm={8} >
          <Card className="input-card" style = {{backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
            <Card.Body>
              <Card.Title className="page-title">
                Step 4: Homeowner Application
              </Card.Title>
              <Form>
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    defaultValue={this.props.values.parentName}
                    onChange={this.props.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentAddress"
                    defaultValue={this.props.values.parentAddress}
                    onChange={this.props.handleChange}
                    required
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="parentCity"
                      defaultValue={this.props.values.parentCity}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      name="parentZip"
                      defaultValue={this.props.values.parentZip}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name="parentPhone"
                      defaultValue={this.props.values.parentPhone}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cell phone</Form.Label>
                    <Form.Control
                      name="parentCell"
                      defaultValue={this.props.values.parentCell}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Form.Group
                  as={Col}
                  controlId="formBasicEmail"
                  className="mb-3"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="parentEmail"
                    defaultValue={this.props.values.parentEmail}
                    onChange={this.props.handleChange}
                    required
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>How long have you been at your current address:Years</Form.Label>
                    <Form.Control
                      type="text"
                      name="currAddress"
                      defaultValue={this.props.values.currAddress}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Months</Form.Label>
                    <Form.Control
                      type="text"
                      name="Months"
                      defaultValue={this.props.values.Months}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Previous Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="prevAddress"
                      defaultValue={this.props.values.prevAddress}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>How long?</Form.Label>
                    <Form.Control
                      type="text"
                      name="Duration"
                      defaultValue={this.props.values.Duration}
                      onChange={this.props.handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Form.Group
                  as={Col}
                  controlId="idk"
                  className="mb-3"
                >
                  <Form.Label>Have you ever owned property in the past?</Form.Label>
                  <Form.Control
                    name="yesorno"
                    defaultValue={this.props.values.yesorno}
                    onChange={this.props.handleChange}
                    required
                  />
                </Form.Group>
                <div id="nav-buttons">
                  {backDisp}
                  {buttonDisp}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

export default HomeownerApp;