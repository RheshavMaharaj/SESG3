import React, { Component } from "react";

export default class User extends Component{
  
  render(){
    return(
      <div>
        <h1>This is the User screen</h1>
        <form action="/logout" method="post">
          <button type="submit">Log Out</button>
        </form>
      </div>
    )
  }
}