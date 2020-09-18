import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectStatus } from './redux/features/loginSlice.js';

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
  render(){
    return (
      <Greeting />
    );
  }
}

function Greeting(props){
  
  const LoggedIn = useSelector(selectStatus);

  if (LoggedIn) {    
    return <IsLoggedIn />;  
  }  
  return <IsLoggedOut />;
}

function IsLoggedOut(props) {
  return (
    <Router>
      <div>
        <div className="Toolbar">
          <img src={logo} className="App-logo" alt="logo" />
          eLibrary Suite
          <nav>
            <Link to="/"><img src={home} className="App-logo" alt="home" /></Link>
            <Link to="/Login"><img src={about} className="App-logo" alt="Login" /></Link>
            <Link to="/SignUp"><img src={user} className="App-logo" alt="Login" /></Link>
          </nav>
        </div>
        <div>
          <Switch>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/">
              <SplashScreen />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>  
  )
}

function IsLoggedIn(props){
  return (
    <Router>
      <div>
        <div className="Toolbar">
          <img src={logo} className="App-logo" alt="logo" />
          eLibrary Suite
          <nav>
            <Link to="/"><img src={home} className="App-logo" alt="home" /></Link>
            <Link to="/about"><img src={about} className="App-logo" alt="about" /></Link>
            <Link to="/users"><img src={user} className="App-logo" alt="user" /></Link>
          </nav>
        </div>
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <User />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>  
  )
}

export default Navbar;