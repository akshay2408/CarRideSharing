import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

class MessageData extends React.Component {
  render() {
    return(
      <div>
        <h1>Thanks </h1>
        <h3>We have received you request, We will cantact you soon...</h3>
      </div>
    );
  }
}


export default class ContactUS extends React.Component {
  constructor(){
     super();
     this.state={
      name:'',
      phone_number:'',
      email:'',
      message:'',
     }
     this.contactUs = this.contactUs.bind(this);
     this.onChange = this.onChange.bind(this);
    };

  onChange(e){
    this.setState({[e.target.id]:e.target.value});
  }
  contactUs(){
    var bodyFormData = new FormData();
      if(this.state.name && this.state.phone_number && this.state.email && this.state.message){
        bodyFormData.set('name', this.state.name);
        bodyFormData.set('phone_number', this.state.phone_number);
        bodyFormData.set('email', this.state.email);
        bodyFormData.set('message', this.state.message);
        axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/api/v1/contact/',
              data: bodyFormData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
            .then(function (response,status, xhr) {
                if (response.status === 201){
                    this.setState({ success: true });
                }
                console.log(response);
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log(response);
            });
      }
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
        <h2 onClick={this.handleClickOpen}>Contact Us</h2>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Contact Us</DialogTitle>
          <DialogContent>
            {!this.state.success && (<div>
              <TextField autoFocus margin="dense" onChange={this.onChange} id="name" label="Name" type="text" fullWidth />
              <TextField autoFocus margin="dense" onChange={this.onChange} id="phone_number" label="Phone Number" type="text" fullWidth />
              <TextField autoFocus margin="dense" onChange={this.onChange} id="email" label="Email Address" type="email" fullWidth />
              <TextField autoFocus margin="dense" onChange={this.onChange} id="message" label="Message" type="text" fullWidth />
            </div>)}
            {this.state.success && (
              <div>
                <MessageData />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {!this.state.success && (<Button onClick={this.contactUs} color="primary">
              Send
            </Button>)}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
