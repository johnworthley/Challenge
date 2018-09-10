import React, { Component } from 'react';
import styles from '../assets/styles/core.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ScatterJS from 'scatter-js/dist/scatter.esm';


export default class Splash extends Component {

//Scatter Wallet
componentDidMount () {
  ScatterJS.scatter.connect("ECOES").then(connected => {
      if(!connected) {
          // User does not have Scatter installed/unlocked.
          return false;
      }
    
      ScatterJS.scatter.getIdentity().then(identity => {
        }).catch(error => {})
  });
}

  render() {
    return (
      <div className='stckbg'>

          <div className='loginbutt'>
            <Link to="/home">
              Login
            </Link>
          </div>
      </div>
    )
  }
}


