import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Home from "./Home.js";

export default class SignUp extends Component {
  
  state = { signErrMsg: false, status: false, username: "" }

  componentDidMount() {
    fetch("/get-signerrmsg")
      .then((res) => res.json())
      .then((signErrMsg) => this.setState({ signErrMsg }));
    fetch("/login-status")
      .then((res) => res.json())
      .then((status) => this.setState({ status }));
    fetch("/get-session-user")
      .then((res) => res.json())
      .then((username) => this.setState({ username }));
  }

  render() {
    return(
      <SessionView IsLoggedIn={this.state.status} ErrorMessage={this.state.signErrMsg} />
    );
  }
}

function Message(props) {
  
  var err = props.err;
 
  if(err) {
    return (
      <div>
        <br />
        <div class="alert alert-danger text-center m" role="alert">
          User Already Exists! Please Enter a Different Email.
        </div>
      </div>
    )
  }
  else {
    return <div></div>
  }

}

function SessionView(props) {

  var IsLoggedIn = props.IsLoggedIn;
  var ErrorMessage = props.ErrorMessage;

  if(!IsLoggedIn) {
    return (
      <div class="col-md-6 offset-md-3 p-2">
        <h2 class="font-weight-bold">Sign Up</h2>
        <container>
          <Row md={{ span: 6, offset: 6 }}>
            <Col>
              <Card bg={"light"} style={{ width: "18rem-" }}>
                <Card.Body>
                  <Form action="/insert-user" method="post" class="was-validated">
                    <Form.Group controlId="registerFormFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="Enter Your First Name"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="registerFormLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Enter Your Last Name"
                        required
                      />
                    </Form.Group>
  
                    <Form.Group controlId="registerFormPassword">
                      <Form.Label>University ID</Form.Label>
                      <Form.Control
                        type="text"
                        id="iden_number"
                        name="iden_number"
                        maxLength="7"
                        placeholder="University Identification Number"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="registerFormEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                      />
                      <small id="emailHelp" class="form-text text-muted">
                        We'll never share your email with anyone else.
                      </small>
                    </Form.Group>
                    <Form.Group controlId="registerFormNumber">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        id="contact_number"
                        maxLength="10"
                        name="contact_number"
                        placeholder="Enter Contact Number (Mobile)"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="registerFormPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="registerFormPassword">
                      <Form.Label>Faculty</Form.Label>
                      <Form.Control
                        type="text"
                        id="faculty"
                        name="faculty"
                        placeholder="Which Faculty are you part of?"
                      />
                    </Form.Group>
                    <Form.Group controlId="registerFormUserType">
                      <Form.Label>User Type</Form.Label>
                      <select id="user_type" name="user_type" class="form-control" required>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid user type
                      </div>
                    </Form.Group>
                    <Form.Group controlId="registerFormCheckbox">
                      <Form.Check type="checkbox" label="Recaptcha" required />
                    </Form.Group>
                    <button class="btn btn-outline-primary" type="submit">
                      Submit
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </container>
        <Message err={ErrorMessage} />
      </div>
    );
  }
  else {
    return(
      <Home />
    );
  }
  
}

