//Imports
import React, { Component } from "react";
import formula1 from "./Assets/f1.png";
import formula2 from "./Assets/f2.png";
import sunset from "./Assets/sunset.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

//Class and subsequent functions
class Home extends Component {
  state = { books: [], test: "", results: [], userType: "Student", borrow: "", loading: true };

  /* function to retrieve documents from mongodb database collection. Runs on every page reload */
  componentDidMount() {
    fetch("/test")
      .then((res) => res.json())
      .then((test) => this.setState({ test }));
    fetch("/get-user-type")
      .then((res) => res.json())
      .then((userType) => this.setState({ userType }));
    fetch("/search-results")
      .then((res) => res.json())
      .then((results) => this.setState({ results }));
    fetch("/get-user-resources")
      .then((res) => res.json())
      .then((books) => this.setState({ books }))
      .then((loading) => this.setState({ loading: false }));
  }

  render() {
    console.log(this.state.results);
    return (
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={formula1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={formula2} alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={sunset} alt="Third slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div className="source-container">
          <div className="sidebar">
            <div className="searchbar">
              <form class="input-group" action="/search" method="post">
                <input class="form-control" id="search" name="search" type="text" placeholder="Search" aria-label="Search"/>
                  <div class="input-group-append">
                    <button class="btn btn-secondary" type="submit">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
              </form>
            </div>
            <Search Results={this.state.results} />
            <UserView type = {this.state.userType} />
          </div>
          <div className="home">           
            <div className="list-group">
              <h3>Your Resources</h3>
              <Loading 
                loading = {this.state.loading}
                books = {this.state.books}
              />
            </div>
            <div className="fine-container">
              Fine section
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

function Search(props) {
  var Results = props.Results;

  if(!(Results.length >= 1 && Results[0].title === "Your Search Results returned Nothing")) {
    return (
      <div className="search-group">
        <h3>Search Results</h3>
        {Results.map((result) => (
          <div key={result._id}>
            <BorrowBook 
              BookTitle={result.title}
              BookContent={result.content}
              BookAuthor={result.author}
              BookRef={result.refnumber}
            />
          </div>
        ))}
      </div>
    )
  }
  else {
    return (
      <div className="list-group text-center">

      </div>
    )
  }
}

function Loading(props) {
  var loading = props.loading;
  var books = props.books;

  if (loading) {
    return (
      <div class="d-flex justify-content-center m-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  else if(!loading) {
    return (
      books.map((book) => (
        <div key={book._id}>
          <BookDetails
            BookTitle={book.title}
            BookContent={book.content}
            BookAuthor={book.author}
            BookRef={book.refnumber}
          />
        </div>
      ))
    )
  }
  
}

function UserView(props){
  var type = props.type;

  if (type === "Student") {
    return <Student />
  }
  else if (type === "Admin") {
    return <Admin />
  }
  else if (type === "Staff") {
    return <Staff />
  }

}

function Admin() {
  return (
    <div className="user-view">
      <h3 className = "heading-admin" >Control Panel</h3>
      <div className="admin-control">
        <AddBook />
        <RemoveBook />
        <EditBook />
      </div>
    </div>
  )
}

function Staff() {
  return(
    <div className="user-view">
      <h3>Control Panel</h3>
      <div className="admin-control">
        <div className="button-container">
          <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenter">
            Book Request
          </button>
        </div>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Submit a Book Request
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <form action="/book-request" method="post" className="insert-form" id="book-request-form">
                    <div class="form-group">
                      <label for="Title">Resource Title</label>
                      <input type="text" class="form-control" id="title" name="title" placeholder="Enter title" />
                    </div>
                    <div class="form-group">
                      <label for="Description">Description</label>
                      <input type="text" class="form-control" id="description" name="description" placeholder="Enter Resource Description" />
                    </div>
                    <div class="form-group">
                      <label for="Author">Author</label>
                      <input type="text" class="form-control" id="author" name="author" placeholder="Enter Resource Author(s)" />
                    </div>
                    <div class="form-group">
                      <label for="Reference Number">Reference Number</label>
                      <input type="number" class="form-control" id="refnumber" name="refnumber" placeholder="Enter Resource Reference Number" />
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary" form="book-request-form">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Student() {
  return (
    <div className="admin-control">
      I am now showing the student view
    </div>
  )
}

function BookDetails(props) {
  var BookContent = props.BookContent;
  var BookAuthor = props.BookAuthor;

  var BookRef = props.BookRef;
  var BookTitle = props.BookTitle;

  var ModalTarget = "#exampleModalCenter" + BookRef;
  var ModalTargetID = "exampleModalCenter" + BookRef;

  return (
    <div>
      <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target={ModalTarget}>
        {BookTitle}
      </button>
      <div class="modal fade" id={ModalTargetID} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Book Details
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <label>Title: {BookTitle} </label> <br/>
                <label>Description: {BookContent} </label> <br/>
                <label>Author: {BookAuthor} </label> <br/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BorrowBook(props) {

  var BookContent = props.BookContent;
  var BookAuthor = props.BookAuthor;

  var BookRef = props.BookRef;
  var BookTitle = props.BookTitle;

  return (
    <div>
      <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target="#exampleModalCenterBorrow">
        {BookTitle}
      </button>
      <div class="modal fade" id="exampleModalCenterBorrow" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Would you like to borrow this book?
              </h5>
            </div>
            <div className="modal-body">
              <form action="/borrow" method="post" id="borrow-book-form">
                <div>
                  <label>Title: </label><label>{BookTitle}</label><input type="hidden" id="title" name="title" value={BookTitle}/> <br/>
                  <label>Content: </label><label>{BookContent}</label><input type="hidden" id="content" name="content" value={BookContent} /><br/>
                  <label>Author: </label><label>{BookAuthor}</label><input type="hidden" id="author" name="author" value={BookAuthor}/> <br/>
                  <label>refnumber: </label><label>{BookRef}</label><input type="hidden" id="refnumber" name="refnumber" value={BookRef} /> <br/>
                </div>
              </form>
            </div>  
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" form="borrow-book-form">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddBook() {
  return (
    <div>
      <div className="button-container">
        <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenter">
          Add a Resource
        </button>
      </div>
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Add a new Resource
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <form action="/insert" method="post" className="insert-form" id="add-book-form">
                  <div class="form-group">
                    <label for="Title">Resource Title</label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Enter title" />
                  </div>
                  <div class="form-group">
                    <label for="Description">Description</label>
                    <input type="text" class="form-control" id="description" name="description" placeholder="Enter Resource Description" />
                  </div>
                  <div class="form-group">
                    <label for="Author">Author</label>
                    <input type="text" class="form-control" id="author" name="author" placeholder="Enter Resource Author(s)" />
                  </div>
                  <div class="form-group">
                    <label for="Reference Number">Reference Number</label>
                    <input type="number" class="form-control" id="refnumber" name="refnumber" placeholder="Enter Resource Reference Number" />
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" form="add-book-form">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RemoveBook() {
  return (
    <div>
      <div className="button-container">
        <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenterRemove">
          Remove a Resource
        </button>
      </div>
      <div class="modal fade" id="exampleModalCenterRemove" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Remove a Resource
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <form action="/remove" method="post" className="insert-form" id="remove-book-form">
                  <div class="form-group">
                    <label for="Title">Resource Title</label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Enter title" />
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" form="remove-book-form">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditBook() {
  return (
    <div>
      <div className="button-container">
        <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenterEdit">
          Edit a Resource
        </button>
      </div>
      <div class="modal fade" id="exampleModalCenterEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Edit a Resource
              </h5>
              <button type="button" class="close" data-dismiss="modal"aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <form action="/edit" method="post" className="insert-form" id="edit-form">
                  <div class="form-group">
                    <label for="Search">Search</label>
                    <input type="text" class="form-control" id="search" name="search" placeholder="Search for the book" />
                  </div>
                  <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Enter new title" />
                  </div>
                  <div class="form-group">
                    <label>Book Description</label>
                    <input type="text" class="form-control" id="content" name="content" placeholder="Enter new description" />
                  </div>
                  <div class="form-group">
                    <label>Search</label>
                    <input type="text" class="form-control" id="author" name="author" placeholder="Enter new Author" />
                  </div>
                  <div class="form-group">
                    <label>Reference Number</label>
                    <input type="text" class="form-control" id="refnumber" name="refnumber" placeholder="Enter a new reference number" />
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" form="edit-form">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

/*
//Get data link to force app to show new updates to the database on screen - use for light testing purposes only
<div>
  <a href="/get-data">Load Data</a>
</div>
*/
