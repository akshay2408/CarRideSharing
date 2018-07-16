import React, { Component } from 'react';
import {BrowserRouter as Router,  Switch,Route } from 'react-router-dom';
import Contact from './component/Home/contact.js';
import Login from './component/Home/login.js';
import Register from './component/Home/register.js';
import Home from './component/Home/home.js';


class App extends Component {
  render() {
    return (
      <div className="App">
       <Home/>
      </div>
     );
  }
}

export default App;

