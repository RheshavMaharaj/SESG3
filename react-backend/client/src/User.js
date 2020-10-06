import React, { Component } from "react";
import "./User.css";

import image1 from "./Assets/userplaceholder.png";
//import notification from "./Assets/notification.svg";

export default class User extends Component {
  state = { user: {}, books: []};

  componentDidMount() {
    fetch("/get-user-info")
      .then((res) => res.json())
      .then((user) => this.setState({ user }));
    fetch("/get-user-resources")
      .then((res) => res.json())
      .then((books) => this.setState({ books }));
  }

  render() {
    return (
      <div className="user">
        <div class="container-fluid ">
          <div class="row">
            <div class="col-8 ">
              <img
                src={image1}
                alt="User profile"
                class="mr-5 mt-4 rounded-circle"
              ></img>
              <form>
                <fieldset disabled>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="staticFirstName" class="font-weight-bold">
                        First name
                      </label>
                      <input type="text" class="form-control" id="disabledTextInput" placeholder={this.state.user.first_name} disabled />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="staticLastName" class="font-weight-bold">
                        Last Name
                      </label>
                      <input type="text" class="form-control" id="disabledTextInput" placeholder={this.state.user.last_name} disabled />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="idLabel" class="font-weight-bold">
                        University ID
                      </label>
                      <input type="number" class="form-control" id="disabledTextInput" placeholder={this.state.user.iden_number} disabled />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="staticLastName" class="font-weight-bold">
                        User Type
                      </label>
                      <input type="text" class="form-control" id="disabledTextInput" placeholder={this.state.user.user_type} disabled />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail3" class="font-weight-bold">
                        Email
                      </label>
                      <input type="email" class="form-control" id="disabledTextInput" placeholder={this.state.user.email} disabled />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword3" class="font-weight-bold">
                        Contact Number
                      </label>
                      <input type="number" class="form-control" id="DisabledTextInput" placeholder={this.state.user.contact_number} disabled />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="disabledTextInput" class="font-weight-bold">
                        Faculty
                      </label>
                      <input type="text" id="disabledTextInput" class="form-control" placeholder={this.state.user.faculty} disabled />
                    </div>
                  </div>
                </fieldset>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#exampleModalCenter">
                      Change information
                    </button>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Enter the information you want to change below
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form
                              class="was-validated"
                              id="change-details"
                              action="/edit-user"
                              method="post"
                            >
                              <div class="form-group">
                                <label for="exampleFormControlFile1" class="font-weight-bold">
                                  Change Profile Picture
                                </label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                              </div>
                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label for="validationDefault01" class="font-weight-bold">
                                    First name
                                  </label>
                                  <input type="text" class="form-control" id="first_name" name="first_name" placeholder="First name" required />
                                </div>
                                <div class="form-group col-md-6">
                                  <label for="staticLastName" class="font-weight-bold">
                                    Last Name
                                  </label>
                                  <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Last example" required />
                                </div>
                              </div>

                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label for="idLabel" class="font-weight-bold">
                                    University ID
                                  </label>
                                  <input type="text" class="form-control" id="iden_number" name="iden_number" maxlength="7" placeholder="13000000" required />
                                </div>
                              </div>

                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label for="email" class="font-weight-bold">
                                    Email
                                  </label>

                                  <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Email@example"
                                    required
                                  />
                                </div>
                                <div class="form-group col-md-6">
                                  <label
                                    for="inputNumber"
                                    class="font-weight-bold"
                                  >
                                    Contact Number
                                  </label>

                                  <input
                                    type="text"
                                    class="form-control"
                                    maxlength="10"
                                    id="contact_number"
                                    name="contact_number"
                                    placeholder="000000000"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label
                                    for="LabelFaculty"
                                    class="font-weight-bold"
                                  >
                                    Faculty
                                  </label>
                                  <input
                                    type="text"
                                    id="faculty"
                                    name="faculty"
                                    class="form-control"
                                    placeholder="example faculty- engineering"
                                    required
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              form="change-details"
                              class="btn btn-primary"
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-froup col-md-6">
                    <button
                      type="button"
                      class="btn btn-outline-warning"
                      data-toggle="modal"
                      data-target="#exampleModalCenter2"
                    >
                      Change Password
                    </button>
                    <div
                      class="modal fade"
                      id="exampleModalCenter2"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Set New Password
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form
                              class="was-validated"
                              id="change-details"
                              action="/edit-user"
                              method="post"
                            >
                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label for="newPass" class="font-weight-bold">
                                    New Password
                                  </label>

                                  <input
                                    type="password"
                                    class="form-control"
                                    id="newPass"
                                    name="newPass"
                                    placeholder="Enter new Password"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label
                                    for="confirmPass"
                                    class="font-weight-bold"
                                  >
                                    Confirm Password
                                  </label>
                                  <input
                                    type="password"
                                    id="confirmPass"
                                    name="confirmPass"
                                    class="form-control"
                                    placeholder="Confirm Password"
                                    required
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              form="change-details"
                              class="btn btn-primary"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  "
                </div>
              </form>
            </div>
            <div className="container-fluid">
              Borrowing History
              {this.state.books.map((book) => (
                <div key={book._id}>
                  <button type="button" className="list-group-item list-group-item-action">
                    {book.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
