import React, { Component } from 'react';
import {BrowserRouter as Router,  Switch,Route } from 'react-router-dom';
import Contact from './contact.js';
import Login from './login.js';
import Register from './register.js';
import Header from './header.js';
import Menu from './menu.js';
import Profile from './profile.js';
import Ride from './ride.js';
import imageUrl from './car.jpg';
import ChangePassword from './password.js';
import UserProfile from './userprofile.js';
const style = {
  image:{
      // 'width': "100%",
      'height': "750px",
      'backgroundImage': `url(${imageUrl})`,
      'backgroundSize': '100%',
  },
  h1:{
    'textAlign':'center',
    'fontSize':'420%',
    'color':'#ffffff',
    'fontFamily': 'Source Sans Pro',
  }
}
class Heading extends Contact{
  render(){
    return(
      <h1 style={style.h1}> Car Ride Sharing </h1>
      )
  }
}


export default class Home extends Component {
  constructor () {
    super();
    this.state = {
      token: window.localStorage.access_token,
    }
    this.removeToken=this.removeToken.bind(this);
    this.setToken=this.setToken.bind(this);
  }

  removeToken(){
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('username');
    this.setState({ token: null });
    window.location.href = '/';
  }

  setToken(){
    this.setState({token: window.localStorage.access_token})
  }

  unsecuredRoute() {
    return [
      <Route exact path='/' component={Heading} />,
      <Route exact path='/' component={props => <Menu { ...props } setToken={this.setToken}/>}/>,
      <Route exact path='/register' component={Register} />,
    ];
  }

  render() {

    return (
     <Router>
      <Switch>
        <div style={style.image}>
          <Header removeToken={this.removeToken}/>
          <Route exact path='/change-password' component={props => <ChangePassword { ...props } token={this.state.token} />} />
          <Route exact path='/profile' component={props => <Profile { ...props } token={this.state.token}/>} />
          <Route exact path='/data' component={props => <Ride { ...props } token={this.state.token} />} />
          <Route exact path='/user-profile' component={props => <UserProfile { ...props } token={this.state.token} />} />

          { !this.state.token && this.unsecuredRoute() }
        </div>
        </Switch>
      </Router>
     );
  }
}
