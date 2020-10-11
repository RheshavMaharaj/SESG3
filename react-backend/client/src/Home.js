//Imports
import React, { Component } from "react";
import library1 from "./Assets/library-1.jpg";
import library2 from "./Assets/library-2.jpg";
import library3 from "./Assets/library-3.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import Toast from 'react-bootstrap/Toast'

//Class and subsequent functions
class Home extends Component {
  state = {
    books: [],
    test: [],
    results: [],
    userType: "Student",
    borrow: "",
    fines: [],
    loading: true,
    show: true,
    block: false,
    dues: [],
    remerror: false,
    borrowStat: false
  };

  constructor(props){
    super(props);
    this.setChanged = this.setChanged.bind(this);
  }

  setChanged() {
    this.setState({ remerror: false });
  }

  /* function to retrieve documents from mongodb database collection. Runs on every page reload */
  componentDidMount() {
    fetch("/get-fine-status") //
      .then((res) => res.json())
      .then((block) => this.setState({ block }));
    fetch("/borrow-status") //
      .then((res) => res.json())
      .then((borrowStat) => this.setState({ borrowStat }));
    fetch("/get-rem-err") //
      .then((res) => res.json())
      .then((remerror) => this.setState({ remerror }));
    fetch("/get-requests") //
      .then((res) => res.json())
      .then((test) => this.setState({ test }));
    fetch("/get-user-type") //
      .then((res) => res.json())
      .then((userType) => this.setState({ userType }));
    fetch("/search-results") //
      .then((res) => res.json())
      .then((results) => this.setState({ results }));
    fetch("/get-user-fines") //
      .then((res) => res.json())
      .then((fines) => this.setState({ fines }));
    fetch("/get-resources") //
      .then((res) => res.json())
      .then((books) => this.setState({ books }))
      .then((loading) => this.setState({ loading: false }));
  }

  render() {
    return (
      <div className="main-container">
        <div className="sidebar">
          <div className="searchbar">
            <h3>Search Here</h3>
            <form class="input-group" action="/search" method="post">
              <input className="form-control" id="search" name="search" type="text" placeholder="Search" aria-label="Search" />
              <div class="input-group-append">
                <button class="btn btn-secondary" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          </div>
          <Search Results={this.state.results} StatBlock={this.state.block} BorrowStatus={this.state.borrowStat} />
          <UserView type={this.state.userType} requests={this.state.test}/>
        </div>
        <div className="source-container">  
          <div style={{position: 'relative'}}>
            <div style={{position: 'relative'}}>
              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img className="d-block w-100" src={library1} alt="First slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src={library2} alt="Second slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src={library3} alt="Third slide" />
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
            </div>
          </div>
          <div className="home-container">
            <div className="home">
              <div className="list-group">
                <h3>Your Resources</h3>
                <LoadingBooks loading={this.state.loading} books={this.state.books} />
              </div>
              <div className="fine-container">
                <h3>Your Outstanding Fines</h3>
                <LoadingFines Fines={this.state.fines} loading={this.state.loading} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: 10, right: 10, width: 250 }}>
              {this.state.fines.map((fine) => (
                <div key={fine._id}>
                  <Toast onClose={() => this.setState({ show: false })} show={this.state.show}>
                    <Toast.Header>
                      <FontAwesomeIcon icon={faBell} />
                      <strong className="ml-2 mr-auto">Notification</strong>
                      <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>You have incurred a fine for {fine.title}</Toast.Body>
                  </Toast>
                  <p></p>
                </div>
              ))}
            </div>
            <div className="rem-message">
              <RemMessage err={this.state.remerror} setChanged={this.setChanged} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Search(props) {
  var Results = props.Results;
  var StatBlock = props.StatBlock;
  var BorrowStatus = props.BorrowStatus;

  if (!(Results.length >= 1 && Results[0].title === "Your Search Results returned Nothing")) {
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
              Block={StatBlock}
              BorrowStat={BorrowStatus}
            />
          </div>
        ))}
      </div>
    );
  } else {
    return <div className="list-group text-center"></div>;
  }
}

function LoadingBooks(props) {
  var loading = props.loading;
  var books = props.books;

  if (loading) {
    return (
      <div class="d-flex justify-content-center m-5">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (!loading) {
    return books.map((book) => (
      <div key={book._id}>
        <BookDetails
          BookTitle={book.title}
          BookContent={book.content}
          BookAuthor={book.author}
          BookRef={book.refnumber}
          BookDue={book.dueDate}
        />
      </div>
    ));
  }
}

function LoadingFines(props) {
  var loading = props.loading;
  var Fines = props.Fines;

  if (loading) {
    return (
      <div class="d-flex justify-content-center m-5">
        <div class="spinner-grow text-warning" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (!loading) {
    return Fines.map((fine) => (
      <div key={fine._id}>
        <button type="button" className="list-group-item list-group-item-action">
          {fine.title}
        </button>
      </div>
    ))
  }
}

function UserView(props) {
  var type = props.type;
  var requests = props.requests;

  if (type === "Student") {
    return <Student />;
  } else if (type === "Admin") {
    return <Admin ReRequests={requests}/>;
  } else if (type === "Staff") {
    return <Staff />;
  }
}

function Admin(props) {

  var ReRequests = props.ReRequests;
  return (
    <div className="user-view">
      <h3 className="heading-admin">Control Panel</h3>
      <div className="admin-control">
        <AddBook />
        <RemoveBook />
        <EditBook />
        <ApproveRequest Resources={ReRequests}/>
      </div>
    </div>
  );
}

function Staff() {
  return (
    <div className="user-view">
      <h3>Control Panel</h3>
      <div className="admin-control">
        <div className="button-container">
          <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenter">
            Book Request
          </button>
        </div>
        <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Submit a Book Request
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <form action="/book-request" method="post" className="insert-form"id="book-request-form">
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
                      <input type="text" class="form-control" id="author" name="author" placeholder="Enter Resource Author(s)"/>
                    </div>
                    <div class="form-group">
                      <label for="Reference Number">Reference Number</label>
                      <input type="number" class="form-control" id="refnumber" name="refnumber" placeholder="Enter Resource Reference Number"/>
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
  );
}

function Student() {
  return <div className="admin-control">I am now showing the student view</div>;
}

function BookDetails(props) {
  var BookContent = props.BookContent;
  var BookAuthor = props.BookAuthor;
  var BookDue = props.BookDue;
  var BookRef = props.BookRef;
  var BookTitle = props.BookTitle;

  var ModalTarget = "#exampleModalCenter" + BookRef;
  var ModalTargetID = "exampleModalCenter" + BookRef;

  return (
    <div>
      <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target={ModalTarget}>
        <div className="item">
          <div>
            {BookTitle}
          </div>
          <div>
            Due: {BookDue}
          </div>
        </div>
      </button>
      <div class="modal fade" id={ModalTargetID} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                <label>Title: {BookTitle} </label> <br />
                <label>Description: {BookContent} </label> <br />
                <label>Author: {BookAuthor} </label> <br />
                <label>Book Reference: {BookRef} </label> <br />
                {/* <label>Book Reference: {BookLink} </label> <br /> */}
                <form action="/return-book" method="post" id={"return-book"+BookRef}>
                  <div>
                    <input type="hidden" id="refnumber" name="refnumber" value={BookRef} />{" "}
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" form={"return-book"+BookRef}>
                Return Book
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
  var Block = props.Block;
  var BookRef = props.BookRef;
  var BookTitle = props.BookTitle;
  var BorrowStat = props.BorrowStat;

  var status = "Allowed";

  if(Block){
    status = "Fine";
  }
  else if(BorrowStat){
    status = "Limit";
  }


  if(status === "Allowed"){
    return (
      <div>
        <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target="#exampleModalCenterBorrow">
          {BookTitle}
        </button>
        <div class="modal fade" id="exampleModalCenterBorrow" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                    <label>Title: </label>
                    <label>{BookTitle}</label>
                    <input type="hidden" id="title" name="title" value={BookTitle}/>{" "}
                    <br />
                    <label>Content: </label>
                    <label>{BookContent}</label>
                    <input type="hidden" id="content" name="content" value={BookContent}
                    />
                    <br />
                    <label>Author: </label>
                    <label>{BookAuthor}</label>
                    <input type="hidden" id="author" name="author" value={BookAuthor}/>{" "}
                    <br />
                    <label>refnumber: </label>
                    <label>{BookRef}</label>
                    <input type="hidden" id="refnumber" name="refnumber" value={BookRef}/>{" "}
                    <br />
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
  else if(status === "Fine"){
    return(
      <div>
        <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target="#exampleModalCenterFine">
          {BookTitle}
        </button>
        <div class="modal fade" id="exampleModalCenterFine" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Unfortunately, You have Outstanding Fines
                </h5>
              </div>
              <div className="modal-body">
                <p>You are not permitted to borrow any more resources until you pay your outstanding fines. Please contact the Librarian.</p>
                <p>You Owe the Library $20.00 AUD</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else if(status === "Limit") {
    return(
      <div>
        <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target="#exampleModalCenterFine">
          {BookTitle}
        </button>
        <div class="modal fade" id="exampleModalCenterFine" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Unfortunately, You Have Reached Your Borrow Limit
                </h5>
              </div>
              <div className="modal-body">
                <p>You are not permitted to borrow any more resources until have returned one or more of your currently borrowed resources.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

function AddBook() {
  return (
    <div>
      <div className="button-container">
        <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenter">
          Add a Resource
        </button>
      </div>
      <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                    <input type="text" class="form-control" id="title" name="title" placeholder="Enter title"/>
                  </div>
                  <div class="form-group">
                    <label for="Description">Description</label>
                    <input type="text" class="form-control" id="description" name="description" placeholder="Enter Resource Description"/>
                  </div>
                  <div class="form-group">
                    <label for="Author">Author</label>
                    <input type="text" class="form-control" id="author" name="author" placeholder="Enter Resource Author(s)"/>
                  </div>
                  <div class="form-group">
                    <label for="Category">Category</label>
                    <select id="category" name="category" class="form-control" required>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-fiction">Non-fiction</option>
                      <option value="History">History</option>
                      <option value="Math">Math</option>
                      <option value="Graphic Novel">Graphic Novel</option>
                      <option value="Classic">Classic</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="Reference Number">Reference Number</label>
                    <input type="number" class="form-control" id="refnumber" name="refnumber" placeholder="Enter Resource Reference Number"/>
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
        <button
          type="button"
          class="btn btn-admin"
          data-toggle="modal"
          data-target="#exampleModalCenterRemove"
        >
          Remove a Resource
        </button>
      </div>
      <div class="modal fade" id="exampleModalCenterRemove" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                    <label for="Title">Enter Resource Reference Number</label>
                    <input type="text" class="form-control" id="refnumber" name="refnumber" placeholder="Enter title"/>
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

function RemMessage(props) {
  
  var err = props.err;
 
  if(err) {
    return (
      <div>
        <br />
        <button onClick={() => props.setChanged()} class="alert alert-danger text-center m" role="alert">
          Unable to delete. A user has currently borrowed the resource.
        </button>
      </div>
    )
  }
  else {
    return <div></div>
  }

}

function EditBook() {
  return (
    <div>
      <div className="button-container">
        <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenterEdit">
          Edit a Resource
        </button>
      </div>
      <div class="modal fade" id="exampleModalCenterEdit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Edit a Resource
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <form action="/edit" method="post" className="insert-form" id="edit-form">
                  <div class="form-group">
                    <label for="Search">Enter the Title of the Resource</label>
                    <input type="text" class="form-control" id="search" name="search" placeholder="Search for the book"/>
                  </div>
                  <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Enter new title"/>
                  </div>
                  <div class="form-group">
                    <label>Book Description</label>
                    <input type="text" class="form-control" id="content" name="content" placeholder="Enter new description"/>
                  </div>
                  <div class="form-group">
                    <label>Search</label>
                    <input type="text" class="form-control" id="author" name="author" placeholder="Enter new Author"/>
                  </div>
                  <div class="form-group">
                    <label>Reference Number</label>
                    <input type="text" class="form-control" id="refnumber" name="refnumber" placeholder="Enter a new reference number"/>
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

function ApproveRequest(props) {

  var Resources = props.Resources;

  return (
    <div>
      <div className="button-container">
        <button type="button" class="btn btn-admin" data-toggle="modal" data-target="#exampleModalCenterApprove">
          View Requests
        </button>
      </div>
      <div class="modal fade" id="exampleModalCenterApprove" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Pending Requests
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                {Resources.map((request) => (
                  <div key={request._id}>
                    <button type="button" className="list-group-item list-group-item-action">
                      {request.title}
                    </button>
                  </div>
                ))}
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

export default Home;
