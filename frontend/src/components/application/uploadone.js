import React, { Component } from 'react';
import { Form, Card, Row, Col, Button } from "react-bootstrap";

// page 1/4
class FilesUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.continue = this.continue.bind(this);
  }

  continue(event) {
    event.preventDefault();
    this.props.nextPage();
  }

  render() {
    return (
      <Row>
        <Col></Col>
        <Col sm={8}>
          <section className="input-card">
            <Card.Body>
              <Card.Title className="page-title">
                Step 1: Upload Valid Identification
              </Card.Title>
              <Form>
                <div id="nav-buttons">
                <div className="form-group" style = {{color: "#000"}}>
                            <input type="file" />
                        </div>
                  <Button
                    variant="success"
                    style={{ background: "#008046" }}
                    onClick={this.continue}
                    className="form-button"
                  >
                    Next Page
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </section>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

export default FilesUploadComponent;