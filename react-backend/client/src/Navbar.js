import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import about from './Assets/help.svg';
import home from './Assets/home-run.svg';
import user from './Assets/user.svg';

import Home from './Home.js';
import About from './About.js';
import User from './User.js';
import Login from './Login.js';
import SplashScreen from './SplashScreen';
import SignUp from './SignUp.js';

class Navbar extends Component {

  state = {status: false, username: ""}

  componentDidMount() {
    fetch('/login-status')
      .then(res => res.json())
      .then(status => this.setState({ status }));
    fetch('/get-session-user')
      .then(res => res.json())
      .then(username => this.setState({ username }));  
  }

  render(){
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

function LoginStatus(props){
  var LoggedIn = props.LoggedIn;
  if(LoggedIn){
    return <IsLoggedIn />
  }
  return <IsLoggedOut />
}

function IsLoggedIn(props){
  return (
    <nav>
      <Link to="/home"><img src={home} className="App-logo" alt="home" /></Link>
      <Link to="/about"><img src={about} className="App-logo" alt="about" /></Link>
      <Link to="/user"><img src={user} className="App-logo" alt="user" /></Link>
    </nav>
  )
}

function IsLoggedOut(props){
  return (
    <nav>
      <Link to="/"><img src={user} className="App-logo" alt="home" /></Link>
      <Link to="/signup"><img src={home} className="App-logo" alt="about" /></Link>
      <Link to="/login"><img src={about} className="App-logo" alt="user" /></Link>
    </nav>
  )
}

//get session details and based on session details, render logged in or logged out
export default Navbar;