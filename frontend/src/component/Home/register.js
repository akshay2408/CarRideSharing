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
    'height': '400px',
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


class Register extends React.Component {
  state = {
    open: false,
    dropdown:'',
  };


  handleChange = event => {

    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'user_type')
      this.setState({ dropdown: event.target.value });

    if (event.target.name === 'user_type' && event.target.value === 2)
       delete this.state.clientIdentification;

    if (event.target.name === 'user_type' && event.target.value === 1)
       delete this.state.driving_license;
       delete this.state.car_model;
       delete this.state.date;
       delete this.state.car_makes;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  registeruser = () => {
    delete this.state.open;
    delete this.state.dropdown;
    var bodyFormData = new FormData();
    Object.keys(this.state).map(key => bodyFormData.set(key, this.state[key]));
    axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/v1/client-register/',
          data: bodyFormData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
        .then(function (response,status, xhr) {
            if (response.status === 201){
                this.props.history.push('/');
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
          <div onClick={() => { history.push('/') }} >
          Back
          </div>
        )} />
          </div>
      )

  return (
    <div>
      <Paper className={classes.root} style={style.paper} elevation={1}>
        <Typography variant="headline" component="h3">
          Registration
        </Typography>
        <Typography component="p">


      <div className={classes.margin}>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">perm_identity</i>

          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="User Name" name="username" />
          </Grid>
        </Grid>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="First Name" name="first_name" />
          </Grid>
        </Grid>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="Last Name" name="last_name"/>
          </Grid>
        </Grid>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">email</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="Email" name="email"/>
          </Grid>
        </Grid>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">email</i>
          </Grid>
          <Grid item>
            <TextField  type="password" className={classes.margin} onChange={this.handleChange} label="Password" name="password"/>
          </Grid>
        </Grid>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">perm_phone_msg</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="Phone Number" name="phone_number" />
          </Grid>
        </Grid>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons"> perm_data_setting </i>
          </Grid>
          <Grid item>
            <FormControl style={style.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">Select User Type</InputLabel>
            <Select
              open={this.state.open}onChange={this.handleChange}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.dropdown}
              onChange={this.handleChange}
              inputProps={{
                id: 'user_type',
                name: 'user_type',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem    value={1}>User</MenuItem>
              <MenuItem   value={2}>Driver</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        </Grid>
         {this.state.dropdown === 2 ?
          (<div><Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons"> perm_data_setting </i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="Driving license" name="driver_license" />
          </Grid>
        </Grid>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons"> drive_eta </i>
          </Grid>
          <Grid item>
            <TextField name="car_model" className={classes.margin} onChange={this.handleChange} label="Car model" />
          </Grid>
        </Grid>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons"> drive_eta </i>
          </Grid>
          <Grid item>
           <TextField name="car_year" onChange={this.handleChange} label="Car Year" type="date"  className={classes.textField}
          InputLabelProps={{shrink: true}}/>
          </Grid>
        </Grid>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons"> drive_eta </i>
          </Grid>
          <Grid item>
            <TextField name="car_makes" className={classes.margin} onChange={this.handleChange} label="Car Makes"  />
          </Grid>
        </Grid></div>): this.state.dropdown === 1 ? (<Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons"> drive_eta </i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="clientIdentification" name="clientIdentification" />
          </Grid>
        </Grid>) : null}
        <div style={style.buttons} >
        <Button variant="contained" style={style.button1} color="primary" className={classes.button}> <Back/> </Button>
        <Button variant="contained" color="secondary" onClick={this.registeruser} className={classes.button}>  Submit </Button>
        </div>

        <div style={style.clear} ></div>
      </div>
        </Typography>
      </Paper>
    </div>
  );
}
}
Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
