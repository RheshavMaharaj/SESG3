import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Login extends Component {
  render() {
    return (
      <div>
        <Greeting />
      </div>
    );
  }
}

function Greeting(props) {
  return (
    // <div>
    //   <form action="/handle-login" method="post" className="insert-form">
    //     <h3>Sign In With Your Details</h3>
    //     <div class="form-group">
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         class="form-control"
    //         id="email"
    //         name="email"
    //         placeholder="Enter Email"
    //       />
    //     </div>
    //     <div class="form-group">
    //       <label>Password</label>
    //       <input
    //         type="text"
    //         class="form-control"
    //         id="password"
    //         name="password"
    //         placeholder="Password"
    //       />
    //     </div>
    //     <button type="submit" class="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>

    <div class="col-md-6 offset-md-3 p-2">
      <h2>Sign In</h2>

      <Container>
        <Row md={{ span: 6, offset: 6 }}>
          <Col>
            <Card bg={"light"} style={{ width: "18rem-" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="loginFormEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="loginFormPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="loginFormCheckbox">
                    <Form.Check type="checkbox" label="Check Me ;)" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
