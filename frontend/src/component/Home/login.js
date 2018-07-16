import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Profile from './profile.js';
import Ride from './ride.js';

export default class Login extends React.Component {
  constructor(){
     super();
     this.state={
      username:'',
      password:'',
      redirectToReferrer: false
     }
     this.login = this.login.bind(this);
     this.onChange = this.onChange.bind(this);
    };

    login(){
      var bodyFormData = new FormData();
      if(this.state.username && this.state.password){
        bodyFormData.set('username', this.state.username);
        bodyFormData.set('password', this.state.password);

        axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/api/v1/auth-token/',
              data: bodyFormData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
            .then(function (response,status, xhr) {
                if (response.status === 200){
                    window.localStorage.setItem('access_token',response.data.token)
                    window.localStorage.setItem('username',response.data.username)
                    this.setState({ open: false });
                    debugger;
                    this.props.setToken()
                    this.props.history.push('/profile');
                }
                console.log(response);
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log(response);
            });
      }
    }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <h2 onClick={this.handleClickOpen}>Login</h2>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>

            <TextField autoFocus margin="dense" name="username" label="Username" onChange={this.onChange} type="text" fullWidth />
            <TextField autoFocus margin="dense" name="password" label="Password" onChange={this.onChange} type="password" fullWidth />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.login} color="primary" value="Login" >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
