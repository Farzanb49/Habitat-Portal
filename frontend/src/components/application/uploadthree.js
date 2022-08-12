import React, { Component } from 'react';
import { Form, Card, Row, Col, Button } from "react-bootstrap";

class FilesUploadComponentThree extends React.Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.continue = this.continue.bind(this);
  }
  back(event) {
    event.preventDefault();
    this.props.prevPage();
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
                Step 3: Upload Pre-Authorization Form
              </Card.Title>
              <Form>
                <div id="nav-buttons">
                <div className="form-group" style = {{color: "#000"}}>
                            <input type="file" />
                        </div>
                <Button
                    variant="secondary"
                    style={{ background: "#414141" }}
                    onClick={this.back}
                    className="form-button"
                  >
                    Previous Page
                  </Button>
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

export default FilesUploadComponentThree;