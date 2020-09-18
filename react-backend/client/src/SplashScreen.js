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
      </div>
      
    )
  }
}