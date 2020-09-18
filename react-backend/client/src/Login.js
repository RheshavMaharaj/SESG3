import React, { Component } from "react";

export default class Login extends Component{
  
  render(){
    return(
      <Greeting />
    )
  }
}

function Greeting(props){
  return(
    <div>
      <form action="/login" method="post" className = "insert-form">
        <h3>Sign In With Your Details</h3>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email"/>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="text" class="form-control" id="password" name="password" placeholder="Password"/>
        </div>
        <button type="submit" class="btn btn-primary" /*onClick={() => dispatch(Login())}*/ >Submit</button>
      </form>
    </div>
  )
}


