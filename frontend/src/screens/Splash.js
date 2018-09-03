import React, { Component } from 'react';
import styles from '../assets/styles/core.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


export default class Splash extends Component {
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
