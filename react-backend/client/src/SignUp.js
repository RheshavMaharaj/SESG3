import React, { useState, Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Login, Logout, selectStatus } from './redux/features/loginSlice.js';



export default class SignUp extends Component{
  
  render(){
    return(
      <Greeting />
    )
  }
}



function Greeting(props){
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  return(
    <div>
      <form action="/insert" method="post" className = "insert-form">
        <h3>Add Resource to Catalogue</h3>
        <div class="form-group">
          <label for="Title">Resource Title</label>
          <input type="text" class="form-control" id="title" name="title" placeholder="Enter title"/>
        </div>
        <div class="form-group">
          <label for="Description">Description</label>
          <input type="text" class="form-control" id="description" name="description" placeholder="Enter Resource Description"/>
        </div>
        <div class="form-group">
          <label for="Author">Author</label>
          <input type="text" class="form-control" id="author" name="author" placeholder="Enter Resource Author(s)"/>
        </div>
        <div class="form-group">
          <label for="Reference Number">Reference Number</label>
          <input type="number" class="form-control" id="refnumber" name="refnumber" placeholder="Enter Resource Reference Number"/>
        </div>
        <button type="submit" class="btn btn-primary" /*onClick={() => dispatch(Login())}*/ >Submit</button>
        {status}
      </form>
    </div>
  )
}


