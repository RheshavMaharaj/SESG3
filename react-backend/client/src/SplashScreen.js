import React, { Component } from "react";
import splash from './Assets/Splash.jpg';


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
        <img src={splash} alt="Library in Stuttgart" className="splash-photo" width="100%" max-height="80vh"/>
      </div>
      
    )
  }
}