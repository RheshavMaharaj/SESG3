import React, {Component} from "react";
import formula1 from './Assets/f1.png';
import formula2 from './Assets/f2.png';
import sunset from './Assets/sunset.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

class Home extends Component {
  state = {books: []}

  componentDidMount() {
    fetch('/get-data')
      .then(res => res.json())
      .then(books => this.setState({ books }));
  }

  render() {
    return (
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={formula1} alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={formula2} alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={sunset}alt="Third slide"/>
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
        {/*}
        <div>
          <a href="/get-data">Load Data</a>
        </div>
        */}
        <div className="list-group">
          <h3>Your Resources</h3>
            {this.state.books.map(book =>
              <div key={book._id}>
                <button type="button" className="list-group-item list-group-item-action"> Title: {book.title} </button>
                {/*|| Description: {user.content} || Developer: {user.author}*/}
              </div>
            )}
        </div>
        {/*}
        <div>
          <form action="/insert" method="post" className="insert-form">
            <div className="form-labels">
              <label>Title</label> <br/>
              <label>Description</label> <br/>
              <label>Author</label> <br/>
              <label>Reference Number</label> <br/>
            </div>
            <div className="form-input">
              <input type="text" id="title" name="title"/> <br/>
              <input type="text" id="description" name="description"/> <br/>
              <input type="text" id="author" name="author"/> <br/>
              <input type="number" id="refnumber" name="refnumber"/> <br/>
            </div>
            <button type="submit">INSERT</button>
          </form>
        </div>
        */}
        <div>
          <form action="/insert" method="post" className = "insert-form">
            <h3>Add Resource to Catalogue</h3>
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
              <label for="Reference Number">Reference Number</label>
              <input type="number" class="form-control" id="refnumber" name="refnumber" placeholder="Enter Resource Reference Number"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;

