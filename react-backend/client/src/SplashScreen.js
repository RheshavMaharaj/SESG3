import React, { Component } from "react";


export default class SplashScreen extends Component{
  
  state = {test: ''}

  componentDidMount() {
      fetch('/test')
      .then(res => res.json())
      .then(test => this.setState({ test }));
  }

  render(){
    return(
      <div>
        <h1>This is the SplashScreen </h1>
        {this.state.test}
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#confirmModal">
  Confirm
</button>


<div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
   
      <div class="modal-body">
        Do you wish to borrow this book?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Yes</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>
      
      
      </div>
      
    )
  }
}