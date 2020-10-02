import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class SignUp extends Component {
  render() {
    return <Greeting />;
  }
}

function Greeting(props) {
  return (
    <div class="col-md-6 offset-md-3 p-2">
      <h2>Sign Up</h2>
      <Container>
        <Row md={{ span: 6, offset: 6 }}>
          <Col>
            <Card bg={"light"} style={{ width: "18rem-" }}>
              <Card.Body>
                <Form action="/insert-user" method="post">
                  <Form.Group controlId="registerFormFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Enter Your First Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="registerFormLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Enter Your Last Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="registerFormEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </Form.Group>
                  <Form.Group controlId="registerFormNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="number"
                      id="contact_number"
                      name="contact_number"
                      placeholder="Enter Contact Number (Mobile)"
                    />
                  </Form.Group>
                  <Form.Group controlId="registerFormPassword">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="registerFormUserType">
                    <Form.Label>User Type</Form.Label>
                    <Form.Control
                      type="text"
                      id="user_type"
                      name="user_type"
                      placeholder="Are you a Staff Member or a Student?"
                    />
                  </Form.Group>
                  <Form.Group controlId="registerFormCheckbox">
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

    // <div>
    //   <form action="/insert-user" method="post" className = "insert-form">
    //     <h3>Sign Up With Your Details</h3>
    //     <div class="form-group">
    //       <label>First Name</label>
    //       <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Enter First Name"/>
    //     </div>
    //     <div class="form-group">
    //       <label>Last Name</label>
    //       <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Enter Last Name"/>
    //     </div>
    //     <div class="form-group">
    //       <label>Email</label>
    //       <input type="text" class="form-control" id="email" name="email" placeholder="Enter Email"/>
    //     </div>
    //     <div class="form-group">
    //       <label>Contact Number</label>
    //       <input type="number" class="form-control" id="contact_number" name="contact_number" placeholder="Enter Contact Number (Mobile)"/>
    //     </div>
    //     <div class="form-group">
    //       <label>Password</label>
    //       <input type="text" class="form-control" id="password" name="password" placeholder="Password"/>
    //     </div>
    //     <div class="form-group">
    //       <label>User Type</label>
    //       <input type="text" class="form-control" id="user_type" name="user_type" placeholder="Are you a Staff Member or a Student?"/>
    //     </div>
    //     <button type="submit" class="btn btn-primary">Submit</button>
    //   </form>
    // </div>
  );
}
