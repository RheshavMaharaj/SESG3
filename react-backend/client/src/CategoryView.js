import React, { Component } from "react";

import "./CategoryView.css";
import library1 from "./Assets/library-1.jpg";
import library2 from "./Assets/library-2.jpg";
import library3 from "./Assets/library-3.jpg";


export default class CategoryView extends Component {

  state = {
    fiction: [],
    non_fiction: [],
    history: [],
    math: [],
    graphic_novel: [],
    classic: [],
    other: []
  }
  componentDidMount() {
    fetch("/get-category-fiction")
      .then((res) => res.json())
      .then((fiction) => this.setState({ fiction }));
    fetch("/get-category-nonfiction")
      .then((res) => res.json())
      .then(( non_fiction ) => this.setState({ non_fiction }));
    fetch("/get-category-history")
      .then((res) => res.json())
      .then(( history ) => this.setState({ history }));
    fetch("/get-category-math")
      .then((res) => res.json())
      .then(( math ) => this.setState({ math }));
    fetch("/get-category-graphicnovel")
      .then((res) => res.json())
      .then(( graphic_novel ) => this.setState({ graphic_novel }));
    fetch("/get-category-classic")
      .then((res) => res.json())
      .then(( classic ) => this.setState({ classic }));
    fetch("/get-category-other")
      .then((res) => res.json())
      .then(( other ) => this.setState({ other }));
    fetch("/get-fine-status") //
      .then((res) => res.json())
      .then((block) => this.setState({ block }));
    fetch("/borrow-status") //
      .then((res) => res.json())
      .then((borrowStat) => this.setState({ borrowStat }));
  }


  render() {

    return (
      <div className="main-container">
        <div className="sidebar">
          <h3 class="text-center">Book categories</h3>
          <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-fiction-list" data-toggle="list" href="#list-Fiction" role="tab" aria-controls="Fiction">
              Fiction
            </a>
            <a class="list-group-item list-group-item-action" id="list-nfiction-list" data-toggle="list" href="#list-nFiction" role="tab" aria-controls="nFiction">
              non-Fiction
            </a>
            <a class="list-group-item list-group-item-action" id="list-History-list" data-toggle="list" href="#list-History" role="tab" aria-controls="History">
              History
            </a>
            <a class="list-group-item list-group-item-action" id="list-Math-list" data-toggle="list" href="#list-Math" role="tab" aria-controls="Math">
              Math
            </a>
            <a class="list-group-item list-group-item-action" id="list-Graphics-list" data-toggle="list" href="#list-Graphics" role="tab" aria-controls="graphics">
              Graphic Novel
            </a>
            <a class="list-group-item list-group-item-action" id="list-classics-list" data-toggle="list" href="#list-classics" role="tab" aria-controls="classics">
              Classics.
            </a>
            <a class="list-group-item list-group-item-action" id="list-others-list" data-toggle="list" href="#list-others" role="tab" aria-controls="others">
              Others.
            </a>
          </div>
        </div>
        <div className="source-container">
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
          <div className="home-container">
            <div className="home">
              <div className="list-group">
                <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane fade show active" id="list-Fiction" role="tabpanel" aria-labelledby="list-fiction-list">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Fiction</h5>
                      </div>
                      <div class="modal-body">
                        {this.state.fiction.map((book) => (
                          <div key={book._id}>
                            <BorrowBook
                              BookTitle={book.title}
                              BookContent={book.content}
                              BookAuthor={book.author}
                              BookRef={book.refnumber}
                              BookCategory={book.category}
                              BookDue={book.dueDate}
                            />
                            <br/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="list-nFiction" role="tabpanel" aria-labelledby="list-nfiction-list">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Non-Fiction</h5>
                      </div>
                      <div class="modal-body">
                        {this.state.non_fiction.map((books) => (
                          <div key={books._id}>
                            <BorrowBook
                              BookTitle={books.title}
                              BookContent={books.content}
                              BookAuthor={books.author}
                              BookRef={books.refnumber}
                              BookCategory={books.category}
                              BookDue={books.dueDate}
                            />
                            <br/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="list-History" role="tabpanel" aria-labelledby="list-History-list">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">History</h5>
                      </div>
                      <div class="modal-body">
                        {this.state.history.map((book) => (
                          <div key={book._id}>
                            <BorrowBook
                              BookTitle={book.title}
                              BookContent={book.content}
                              BookAuthor={book.author}
                              BookRef={book.refnumber}
                              BookCategory={book.category}
                              BookDue={book.dueDate}
                            />
                            <br/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="list-Math" role="tabpanel" aria-labelledby="list-Math-list">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Math</h5>
                      </div>
                      <div class="modal-body">
                        {this.state.math.map((book) => (
                          <div key={book._id}>
                            <BorrowBook
                              BookTitle={book.title}
                              BookContent={book.content}
                              BookAuthor={book.author}
                              BookRef={book.refnumber}
                              BookCategory={book.category}
                              BookDue={book.dueDate}
                            />
                            <br/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="list-Graphics" role="tabpanel" aria-labelledby="list-Graphics-list">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Graphic novels</h5>
                      </div>
                      <div class="modal-body">
                        {this.state.graphic_novel.map((book) => (
                          <div key={book._id}>
                            <BorrowBook
                              BookTitle={book.title}
                              BookContent={book.content}
                              BookAuthor={book.author}
                              BookRef={book.refnumber}
                              BookCategory={book.category}
                              BookDue={book.dueDate}
                            />
                            <br/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="list-classics" role="tabpanel" aria-labelledby="list-classics-list">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Classics</h5>
                      </div>
                      <div class="modal-body">
                        {this.state.classic.map((book) => (
                          <div key={book._id}>
                            <BorrowBook
                              BookTitle={book.title}
                              BookContent={book.content}
                              BookAuthor={book.author}
                              BookRef={book.refnumber}
                              BookCategory={book.category}
                              BookDue={book.dueDate}
                            />
                            <br/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="list-others" role="tabpanel" aria-labelledby="list-others-list">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Our other collection</h5>
                      </div>
                      <div class="modal-body">
                        {this.state.other.map((book) => (
                          <div key={book._id}>
                            <BorrowBook
                              BookTitle={book.title}
                              BookContent={book.content}
                              BookAuthor={book.author}
                              BookRef={book.refnumber}
                              BookCategory={book.category}
                              BookDue={book.dueDate}
                            />
                            <br/>
                          </div>
                        ))}
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

function BorrowBook(props) {
  var BookContent = props.BookContent;
  var BookAuthor = props.BookAuthor;
  var Block = props.Block;
  var BookRef = props.BookRef;
  var BookTitle = props.BookTitle;
  var BorrowStat = props.BorrowStat;

  var modaltarget = "#exampleModalCenterBorrow" + BookRef;
  var modalid = "exampleModalCenterBorrow" + BookRef;
  var formid = BookRef;

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
        <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target={modaltarget}>
          {BookTitle}
        </button>
        <div class="modal fade" id={modalid} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Would you like to borrow this book?
                </h5>
              </div>
              <div className="modal-body">
                <form action="/borrow" method="post" id={formid}>
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
                <button type="submit" class="btn btn-primary" form={formid}>
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