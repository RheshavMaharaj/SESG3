import React from "react";


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
import notification from './Assets/notification.svg';


import Home from './Home.js';
import About from './About.js';
import User from './User.js';




export default function App() {
  return (
    
    <Router>
      <div>
        <div className="Toolbar">
          <img src={logo} className="App-logo" alt="logo" />
         <h1>eLibrary Suite</h1> 
           <nav>

             <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Notification
                 <span class="badge badge-light">3</span> 
              </button>
               <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
           
            <Link to="/"><img src={home} className="App-logo" alt="home" /></Link>
            <Link to="/about"><img src={about} className="App-logo" alt="about" /></Link>
            <Link to="/users"><img src={user} className="App-logo" alt="user" /></Link>
          </nav>
        </div>
       <div>
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
  );
}
