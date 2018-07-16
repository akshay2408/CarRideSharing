import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const style = {
  paper:{
    'height': '200px',
    'margin': 'auto',
    'width': '50%',
    'border': '3px solid lightcoral',
    'padding': '10px',
    'marginTop': '50px',
    'position':'relative',
  },
  input: {
    'width': '50%',
    'float': 'left',
  },
  clear:{
    'clear':'both',
  },
  formControl: {
    'margin': 'theme.spacing.unit',
    'minWidth': '200px',
  },
  buttons: {
    'position': 'absolute',
    'bottom': '10px',
    'right':'20px',
  },
  button1: {
    'marginRight': '50px',
  },

}


class ResetPassword extends React.Component {

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/');
  }

  state = {
    validpass:[],
  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  registeruser = () => {
    const token = window.localStorage.access_token;
    const username = window.localStorage.username;
    var bodyFormData = new FormData();
    bodyFormData.set('password', this.state.password);
    bodyFormData.set('username', username);
    axios({
          method: 'put',
          url: `http://127.0.0.1:8000/api/v1/auth/change-password/${username}/`,
          data: bodyFormData,
          headers: {'Content-Type': 'multipart/form-data',
                              'Authorization': `Token ${token}` }
                    })
        .then(function (response,status, xhr) {
            if (response.status === 200){
                this.props.history.push('/profile');
            }
            console.log(response);
        }.bind(this))
        .catch(function (response) {
            console.log(response);
          });
  }


  render() {
    const { classes } = this.props;
    const Back = () => (
          <div>
            <Route render={({ history}) => (
          <div onClick={() => { history.push('/profile') }} >
          Back
          </div>
        )} />
          </div>
      )
  return (
    <div>
      <Paper className={classes.root} style={style.paper} elevation={1}>
        <Typography variant="headline" component="h3">
          Reset Password
        </Typography>
        <Typography component="p">


      <div className={classes.margin}>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">security</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} type= "password" label="Password" name="password"/>
          </Grid>
        </Grid>
        <div style={style.buttons} >
        <Button variant="contained" style={style.button1} color="primary" className={classes.button}> <Back/> </Button>
        <Button variant="contained" color="secondary"
              onClick={this.registeruser} className={classes.button} id="submit">  Submit </Button>
        </div>
        <div style={style.clear} ></div>
      </div>
        </Typography>
      </Paper>
    </div>
  );
}
}
ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);
