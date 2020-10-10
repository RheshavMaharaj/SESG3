import React, { Component } from "react";

import "./CategoryView.css";
import library1 from "./Assets/library-1.jpg";
import library2 from "./Assets/library-2.jpg";
import library3 from "./Assets/library-3.jpg";
export default class CategoryView extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="sidebar">
          <h3 class="text-center">Book categories</h3>
          <div class="list-group" id="list-tab" role="tablist">
            <a
              class="list-group-item list-group-item-action active"
              id="list-fiction-list"
              data-toggle="list"
              href="#list-Fiction"
              role="tab"
              aria-controls="Fiction"
            >
              Fiction
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-nfiction-list"
              data-toggle="list"
              href="#list-nFiction"
              role="tab"
              aria-controls="nFiction"
            >
              non-Fiction
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-History-list"
              data-toggle="list"
              href="#list-History"
              role="tab"
              aria-controls="History"
            >
              History
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-Math-list"
              data-toggle="list"
              href="#list-Math"
              role="tab"
              aria-controls="Math"
            >
              Math
            </a>

            <a
              class="list-group-item list-group-item-action"
              id="list-Graphics-list"
              data-toggle="list"
              href="#list-Graphics"
              role="tab"
              aria-controls="graphics"
            >
              Graphic Novel
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-classics-list"
              data-toggle="list"
              href="#list-classics"
              role="tab"
              aria-controls="classics"
            >
              Classics.
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-others-list"
              data-toggle="list"
              href="#list-others"
              role="tab"
              aria-controls="others"
            >
              Others.
            </a>
          </div>
        </div>
        <div className="source-container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={library1}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={library2}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={library3}
                  alt="Third slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div className="home-container">
            <div className="home">
              <div className="list-group">
                <div class="tab-content" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="list-Fiction"
                    role="tabpanel"
                    aria-labelledby="list-fiction-list"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Fiction</h5>
                      </div>
                      <div class="modal-body">
                        <p>fiction books</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="list-nFiction"
                    role="tabpanel"
                    aria-labelledby="list-nfiction-list"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">non-Fiction</h5>
                      </div>
                      <div class="modal-body">
                        <p>non-fiction books</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="list-History"
                    role="tabpanel"
                    aria-labelledby="list-History-list"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">History</h5>
                      </div>
                      <div class="modal-body">
                        <p>History books</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="list-Math"
                    role="tabpanel"
                    aria-labelledby="list-Math-list"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Math</h5>
                      </div>
                      <div class="modal-body">
                        <p>math books</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="list-Graphics"
                    role="tabpanel"
                    aria-labelledby="list-Graphics-list"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Graphic novels</h5>
                      </div>
                      <div class="modal-body">
                        <p>Graphic novels</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="list-classics"
                    role="tabpanel"
                    aria-labelledby="list-classics-list"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Classics</h5>
                      </div>
                      <div class="modal-body">
                        <p>classics books</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="list-others"
                    role="tabpanel"
                    aria-labelledby="list-others-list"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Our other collection</h5>
                      </div>
                      <div class="modal-body">
                        <p>other books</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
