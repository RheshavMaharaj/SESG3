//Imports
import React, { Component } from "react";
import formula1 from "./Assets/f1.png";
import formula2 from "./Assets/f2.png";
import sunset from "./Assets/sunset.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

//Class and subsequent functions
class Home extends Component {
  state = { books: [], test: "" };

  /* function to retrieve documents from mongodb database collection. Runs on every page reload */
  componentDidMount() {
    fetch("/get-data")
      .then((res) => res.json())
      .then((books) => this.setState({ books }));
    fetch("/test")
      .then((res) => res.json())
      .then((test) => this.setState({ test }));
  }

  render() {
    return (
      <div>
        {/* Highlight Carousel imported from bootstrap example code. May be removed */}
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={formula1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={formula2}
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={sunset} alt="Third slide" />
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
        {/*
        //Get data link to force app to show new updates to the database on screen - use for light testing purposes only
        <div>
          <a href="/get-data">Load Data</a>
        </div>
        */}
        <div className="list-group">
          {/* Loop to display the resource data into a bootstrap wrapped element. */}
          <h3>Your Resources</h3>
          {this.state.books.map((book) => (
            <div key={book._id}>
              <button
                type="button"
                className="list-group-item list-group-item-action"
              >
                {" "}
                {book.title}{" "}
              </button>
              {/* || Description: {user.content} || Developer: {user.author} */}
            </div>
          ))}
        </div>
        {/* Form to insert documents into the mongodb database collection */}
        <div>
          <form action="/insert" method="post" className="insert-form">
            <h3>Add Resource to Catalogue</h3>
            <div class="form-group">
              <label for="Title">Resource Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                placeholder="Enter title"
              />
            </div>
            <div class="form-group">
              <label for="Description">Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                name="description"
                placeholder="Enter Resource Description"
              />
            </div>
            <div class="form-group">
              <label for="Author">Author</label>
              <input
                type="text"
                class="form-control"
                id="author"
                name="author"
                placeholder="Enter Resource Author(s)"
              />
            </div>
            <div class="form-group">
              <label for="Reference Number">Reference Number</label>
              <input
                type="number"
                class="form-control"
                id="refnumber"
                name="refnumber"
                placeholder="Enter Resource Reference Number"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
          {this.state.test}
        </div>
      </div>
    );
  }
}

export default Home;
