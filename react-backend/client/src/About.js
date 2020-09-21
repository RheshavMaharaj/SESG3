import React, {Component} from "react";
import logo from './logo.svg';

export default class About extends Component {
  render(){
    return(
      <div class="container">
        <h1>About</h1>
        <h4>What is this website?</h4>
        <h4>Contact Information</h4>
        <b>Email: </b> sesg3@uts.com (change this to whatever)
        <div><b>Phone: </b> 04198237198212315 </div>
        <b>Additional Contacts: </b>
        <h4>Who Made it?</h4>
        <t3>Team Tree (or SESG3) comprises of 7 members, and built this thing as a project for uni etc etc etc</t3>
        <div><img src={logo} width="200" height="200" alt="Team Logo" /></div>
      </div>
    )
  }
}