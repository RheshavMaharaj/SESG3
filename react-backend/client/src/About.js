import React, { Component } from "react";
import "./about.css";

export default class About extends Component {
  render() {
    return (
      <div>
        <div class="position-relative">
          <div
            class="container p-3 mb-2  text-black"
            align="center"
            style={{ position: "relative" }}
          >
            <h3 class="text-center font-weight-bold"> FAQs</h3>

            <div class="container">
              <p></p>
              <p></p>
              <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingOne">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Can a user download a resources to keep it permanently?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseOne"
                    class="panel-collapse collapse in"
                    role="tabpanel"
                    aria-labelledby="headingOne"
                  >
                    <div class="panel-body">
                      <p>
                        No, downloading the document is violating the licensing
                        and copyrights of the resources. We strictly advise not
                        to download or replicate any resources borrowed from the
                        library.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingTwo">
                    <h4 class="panel-title">
                      <a
                        class="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Will the fine increase longer a user withholds a library
                        resource?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseTwo"
                    class="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingTwo"
                  >
                    <div class="panel-body">
                      <p>
                        Yes, withholding any library resources for longer than
                        the provided time sabotages another students’
                        opportunity of learning from that resource. Unless the
                        resource return date has been extended, penalties will
                        apply for a return exceeding 2 weeks.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingThree">
                    <h4 class="panel-title">
                      <a
                        class="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Are the books available on Western Sydney Library
                        enough?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseThree"
                    class="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree"
                  >
                    <div class="panel-body">
                      <p>
                        Yes, we aim to ease our students’ search of resources.
                        This gives them an opportunity to save time and study
                        content they need to focus on.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingFour">
                    <h4 class="panel-title">
                      <a
                        class="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Cannot find the eResource you searched for?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseFour"
                    class="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingFour"
                  >
                    <div class="panel-body">
                      <p>
                        It is possible that the resource you are trying to search for does not exist in our eLibrary.
                        Alternatively, it could mean that the resource has already been borrowed by other users and no 
                        further copies are currently available. You may need to wait until that resource is available again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*}
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Report New Query
            </button>
            */}
          </div>

          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Add new Query
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
                  <form>
                    <div class="row">
                      <div class="col">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="First name"
                        ></input>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last name"
                        ></input>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <label for="inputEmail4">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          area-aria-describedby="emailHelp"
                          placeholder="1234@website.com"
                        ></input>
                      </div>
                      <div class="col">
                        <label for="inputtel1">Phone Number</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="exampleInputNumber1"
                          placeholder="123456789"
                        ></input>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="query area">Question space</label>
                      <textarea
                        class="form-control"
                        id="query"
                        rows="5"
                        placeholder="enter your question here"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <p></p>
                <p></p>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-danger">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="position-relative">
            <div class="jumbotron">
              <div class="container">
                <h1 class="display-2">About us</h1>
                <p>
                  We are a startup aimed at providing the best website
                  expereince in the world, This webite was built using React,
                  bootstrap, MongoDB and with the collaboration of the brighest
                  minds in UTS. We hope you enjoy using our product and leave us
                  any queries/bugs etc. in the query box above. It will help us
                  improve our website. Thank you!
                </p>
              </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <h2>Ways to reach us</h2>
                  <p>
                    A user can leave queries with admin which will help the
                    issue reach us ASAP. at the same time you can email us at -:
                    Librarydesigners@uts.com
                  </p>
                </div>

                <div class="col-md-8">
                  <h2>Our motivation</h2>
                  <p>
                    We aim at providing the best user expereince with highly
                    responsive and quick system, We want to become the best at
                    whatever we do and are always looking for practical
                    solutions to help improving the world we live in. this
                    website is just one step to help us learn and reach closer
                    to our goal. Thank you for Supporting us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
