import React from "react";
import logo from './Assets/tree.png';

export default function About(){
  return(
    <div class="container">
      <h1>About</h1>

      <div>
        <h4>How to Use eLibrary Suite</h4>
      </div>
      <div> _____________________________________________________________________</div>
      <div>
        <h4>What is this website?</h4>
        eLibrary Suite is a web application designed to assist students attending a University in Western Sydney, especially for those who prefer to borrow digital copies of books... etc add more stuff
      </div>
      <div> ___________________________________________________________________</div>
      <div>
        <h4>Contact Information</h4>
        <b>Email: </b> sesg3@uts.com (change this to whatever)
        <div><b>Phone: </b> 04123456789 </div>
        <b>Additional Contacts: </b>
      </div>
      <div> _____________________________________________________________________</div>
      <div>
        <h4>Developers</h4>
        <t3>Team Tree (or SESG3) comprises of 7 members, and built this website as a project for uni etc etc etc</t3>
        <div>
          <img src={logo} width="200" height="200"  />
        </div>
      </div>
    </div>
    
    
  )
}
