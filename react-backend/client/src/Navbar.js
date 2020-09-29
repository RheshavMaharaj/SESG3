import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import about from "./Assets/help.svg";
import home from "./Assets/home-run.svg";
import user from "./Assets/user.svg";
import follow from "./Assets/follow.svg";
import enter from "./Assets/enter.svg";

import Home from "./Home.js";
import About from "./About.js";
import User from "./User.js";
import Login from "./Login.js";
import SplashScreen from "./SplashScreen";
import SignUp from "./SignUp.js";
//import SearchResults from './SearchResults.js';

class Navbar extends Component {
  state = { status: false, username: "" };

  componentDidMount() {
    fetch("/login-status")
      .then((res) => res.json())
      .then((status) => this.setState({ status }));
    fetch("/get-session-user")
      .then((res) => res.json())
      .then((username) => this.setState({ username }));
  }

  render() {
    return (
      <Router>
        <div>
          <div className="Toolbar">
            <img src={logo} className="App-logo" alt="logo" />
            eLibrary Suite
            <div>
              <LoginStatus LoggedIn={this.state.status} />
            </div>
          </div>
          <div>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              {/*}
              <Route path="/search-error">
                <SearchResults />
              </Route>
              */}
              <Route path="/">
                <SplashScreen />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function LoginStatus(props) {
  var LoggedIn = props.LoggedIn;
  if (LoggedIn) {
    return <IsLoggedIn />;
  }
  return <IsLoggedOut />;
}

function IsLoggedIn(props) {
  return (
    <nav>
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Notification
        <span class="badge badge-light">3</span>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="https://github.com/">
          Action
        </a>
        <a class="dropdown-item" href="https://github.com/">
          Another action
        </a>
        <a class="dropdown-item" href="https://github.com/">
          Something else here
        </a>
      </div>
      <Link to="/home">
        <img src={home} className="App-logo" alt="home" />
      </Link>
      <Link to="/about">
        <img src={about} className="App-logo" alt="about" />
      </Link>
      <Link to="/user">
        <img src={user} className="App-logo" alt="user" />
      </Link>
    </nav>
  );
}

function IsLoggedOut(props) {
  return (
    <nav>
      <Link to="/signup">
        <img src={follow} className="App-logo" alt="about" />
      </Link>
      <Link to="/login">
        <img src={enter} className="App-logo" alt="user" />
      </Link>
    </nav>
  );
}

//get session details and based on session details, render logged in or logged out
export default Navbar;
