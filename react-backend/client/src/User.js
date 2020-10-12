import React, { Component } from "react";
import "./User.css";

import image1 from "./Assets/userplaceholder.png";
//import notification from "./Assets/notification.svg";

export default class User extends Component {
  
  constructor() {
    super();
    this.state = {
      user: {}, 
      books: [],
      loading: true
    };
  }

  componentDidMount() {
    fetch("/get-user-info")
      .then((res) => res.json())
      .then((user) => this.setState({ user }))
      .then((loading) => this.setState({ loading: false }));
  }

  render() {
    return (
      <div className="user">
        <div class="container-fluid center">
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
                  <input
                    type="text"
                    class="form-control"
                    id="disabledTextInput"
                    placeholder={this.state.user.first_name}
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
                    placeholder={this.state.user.last_name}
                    disabled
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="idLabel" class="font-weight-bold">
                    University ID
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="disabledTextInput"
                    placeholder={this.state.user.iden_number}
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
                    placeholder={this.state.user.user_type}
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
                    placeholder={this.state.user.email}
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
                    placeholder={this.state.user.contact_number}
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
                    placeholder={this.state.user.faculty}
                    disabled
                  />
                </div>
              </div>
            </fieldset>
            <div class="form-row">
              <div class="form-group col-md-6">
                <button
                  type="button"
                  class="btn btn-outline-success"
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
                        <form
                          class="was-validated"
                          id="change-details"
                          action="/edit-user"
                          method="post"
                        >
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
                                id="first_name"
                                name="first_name"
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
                                id="last_name"
                                name="last_name"
                                placeholder="Last example"
                                required
                              />
                            </div>
                          </div>

                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="idLabel" class="font-weight-bold">
                                University ID
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="iden_number"
                                name="iden_number"
                                maxlength="7"
                                placeholder="13000000"
                                required
                              />
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputNumber" class="font-weight-bold">
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
                        <form class="was-validated" id="change-password" action="/edit-password" method="post">
                          {/*}
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="newPass" class="font-weight-bold">
                                New Password
                              </label>
                              <input 
                                type="password" 
                                name="password" 
                                class="form-control" 
                                placeholder="Enter password" 
                                id="password"
                                pattern=".{8,}"
                                required
                              />
                            </div>
                          </div>
                          */}
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="password" class="font-weight-bold">
                                Enter New Password
                              </label>
                              <input 
                                type="password" 
                                name="confirm_password" 
                                class="form-control" 
                                placeholder="Enter your new password here" 
                                id="confirm_password"
                                pattern=".{8,}"
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
                          class="btn btn-primary"
                          form="change-password"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <LoadingUserDetails Loading={this.state.loading} />
      </div>
    );
  }
}

function LoadingUserDetails(props) {
  var Loading = props.Loading;

  if (Loading) {
    return (
      <div class="d-flex justify-content-center m-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  else return  <div></div> ;
  

}
