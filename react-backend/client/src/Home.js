import React, {Component} from "react";
import logo from './logo.svg';
import formula1 from './Assets/f1.png';
import formula2 from './Assets/f2.png';
import sunset from './Assets/sunset.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

class Home extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
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
        <div>
          <h1>Users</h1>
            {this.state.users.map(user =>
              <div key={user.id}>{user.username}</div>
            )}
        </div>
      </div>
    );
  }
}

export default Home;

