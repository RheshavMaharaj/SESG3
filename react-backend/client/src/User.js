import React, { Component } from "react";

import image1 from "./Assets/userplaceholder.png";

export default class User extends Component {
  render() {
    return (
      <div>
        <div class="container-fluid ">
          <h1 align="center">This is the user account screen</h1>
          <p align="center">
            Here user can view/edit their personal information and review books
            borrowed and history of brrowed books
          </p>
          <div class="row">
            <div class="col-8 ">
              <img
                src={image1}
                alt="User photo"
                class="mr-5 mt-4 rounded-circle"
              ></img>

              <form>
                <fieldset disabled>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="staticFirstName" class="font-weight-bold">
                        First name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="disabledTextInput"
                        placeholder="First example"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="staticLastName" class="font-weight-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="disabledTextInput"
                        placeholder="Last example"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="idLabel" class="font-weight-bold">
                        Identification Number
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="disabledTextInput"
                        placeholder="13000000"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="staticLastName" class="font-weight-bold">
                        User Type
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="disabledTextInput"
                        placeholder="student/staff"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail3" class="font-weight-bold">
                        Email
                      </label>

                      <input
                        type="email"
                        class="form-control"
                        id="disabledTextInput"
                        placeholder="Email@example"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword3" class="font-weight-bold">
                        Contact Number
                      </label>

                      <input
                        type="number"
                        class="form-control"
                        id="DisabledTextInput"
                        placeholder="000000000"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="disabledTextInput" class="font-weight-bold">
                        Faculty
                      </label>
                      <input
                        type="text"
                        id="disabledTextInput"
                        class="form-control"
                        placeholder="example faculty- engineering"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="disabledSelect" class="font-weight-bold">
                        Gender
                      </label>
                      <select id="disabledSelect" class="form-control">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Change information
                    </button>
                    <div
                      class="modal fade"
                      id="exampleModalCenter"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Enter the information you want to change below
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
                            <form class="was-validated">
                              <div class="form-group">
                                <label
                                  for="exampleFormControlFile1"
                                  class="font-weight-bold"
                                >
                                  Change Profile Picture
                                </label>
                                <input
                                  type="file"
                                  class="form-control-file"
                                  id="exampleFormControlFile1"
                                />
                              </div>

                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label
                                    for="validationDefault01"
                                    class="font-weight-bold"
                                  >
                                    First name
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="validationDefault01"
                                    placeholder="First name"
                                    required
                                  />
                                </div>
                                <div class="form-group col-md-6">
                                  <label
                                    for="staticLastName"
                                    class="font-weight-bold"
                                  >
                                    Last Name
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="staticlast"
                                    placeholder="Last example"
                                    required
                                  />
                                </div>
                              </div>

                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label for="idLabel" class="font-weight-bold">
                                    Identification Number
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="staticid"
                                    maxlength="7"
                                    placeholder="13000000"
                                    required
                                  />
                                </div>
                                <div class="form-group col-md-6">
                                  <label
                                    for="usertype01"
                                    class="font-weight-bold"
                                  >
                                    User Type
                                  </label>
                                  <div class="form-group">
                                    <select
                                      id="Select"
                                      class="form-control"
                                      required
                                    >
                                      <option value="">Select User Type</option>
                                      <option value="1">Student</option>
                                      <option value="2">University</option>
                                    </select>
                                    <div class="invalid-feedback">
                                      Please select a valid user type
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label
                                    for="inputEmail3"
                                    class="font-weight-bold"
                                  >
                                    Email
                                  </label>

                                  <input
                                    type="email"
                                    class="form-control"
                                    id="staticEmail01"
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
                                    id="inputNumber"
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
                                    id="InputFaculty"
                                    class="form-control"
                                    placeholder="example faculty- engineering"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label for="Select" class="font-weight-bold">
                                    Gender
                                  </label>
                                  <select
                                    id="Select"
                                    class="form-control"
                                    required
                                  >
                                    <option value="">Select a Gender</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">Other</option>
                                  </select>
                                  <div class="invalid-feedback">
                                    Please select a valid Gender
                                  </div>
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
                            <button type="button" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="col-4 bg-primary text-white">book information</div>
          </div>
        </div>
        <form action="/logout" method="post">
          <button type="submit">Log Out</button>
        </form>
      </div>
    );
  }
}
