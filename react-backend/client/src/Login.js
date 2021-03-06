import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Home from "./Home.js";

export default class Login extends Component {

  state = { errMsg: false, status: false, username: ""  }

  componentDidMount() {
    fetch("/get-errMsg")
      .then((res) => res.json())
      .then((errMsg) => this.setState({ errMsg }));
    fetch("/get-session-user")
      .then((res) => res.json())
      .then((username) => this.setState({ username }));
    fetch("/login-status")
      .then((res) => res.json())
      .then((status) => this.setState({ status }));
  }

  render() {
    return (
      <SessionView IsLoggedIn={this.state.status} ErrorMessage={this.state.errMsg} />
    )
  }
}

function Message(props) {
  
  var err = props.err;
 
  if(err) {
    return (
      <div>
        <br />
        <div class="alert alert-danger text-center m" role="alert">
          Invalid Credentials! Please Try Again.
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
        <h2 class="font-weight-bold">Log In</h2>
        <container>
          <Row md={{ span: 6, offset: 6 }}>
            <Col>
              <Card bg={"light"} style={{ width: "18rem-" }}>
                <Card.Body>
                  <Form
                    action="/handle-login"
                    method="post"
                    class="was-validated"
                  >
                    <Form.Group controlId="loginFormEmail">
                      <Form.Label class="font-weight-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="loginFormPassword">
                      <Form.Label class="font-weight-bold">Password</Form.Label>
                      <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="loginFormCheckbox">
                      <Form.Check type="checkbox" label="ReCaptcha" required />
                    </Form.Group>
                    <button type="submit" class="btn btn-outline-info">
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
    )
  }
  else {
    return <Home />
  }

}
