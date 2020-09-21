import React, { Component } from "react";

export default class SignUp extends Component{
  
  render(){
    return(
      <Greeting />
    )
  }
}

function Greeting(props){
  return(
    <div>
      <form action="/insert-user" method="post" className = "insert-form">
        <h3>Sign Up With Your Details</h3>
        <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Enter First Name"/>
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Enter Last Name"/>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" id="email" name="email" placeholder="Enter Email"/>
        </div>
        <div class="form-group">
          <label>Contact Number</label>
          <input type="number" class="form-control" id="contact_number" name="contact_number" placeholder="Enter Contact Number (Mobile)"/>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="text" class="form-control" id="password" name="password" placeholder="Password"/>
        </div>
        <div class="form-group">
          <label>User Type</label>
          <input type="text" class="form-control" id="user_type" name="user_type" placeholder="Are you a Staff Member or a Student?"/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}


