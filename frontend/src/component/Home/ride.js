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
    'height': '265px',
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


class Ride extends React.Component {

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/');
  }

  state = {
    // open: false,
  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  registeruser = () => {
    const token = window.localStorage.access_token;
    var bodyFormData = new FormData();
    Object.keys(this.state).map(key => bodyFormData.set(key, this.state[key]));
    axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/v1/rides/',
          data: bodyFormData,
          headers: {'Content-Type': 'multipart/form-data',
                              'Authorization': `Token ${token}` }
                    })
        .then(function (response,status, xhr) {
            if (response.status === 201){
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
          Place a Ride/Request a ride
        </Typography>
        <Typography component="p">


      <div className={classes.margin}>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
           <i class="material-icons">transfer_within_a_station</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="To" name="start_ride" />
          </Grid>
        </Grid>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">transfer_within_a_station</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="From" name="end_ride"/>
          </Grid>
        </Grid>
        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">person_pin_circle</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="Place" name="place"/>
          </Grid>
        </Grid>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">email</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="No of Seats" name="no_of_seates"/>
          </Grid>
        </Grid>

        <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons">attach_money</i>
          </Grid>
          <Grid item>
            <TextField className={classes.margin} onChange={this.handleChange} label="Cost" name="cost" />
          </Grid>
        </Grid>
         <Grid container style={style.input} spacing={8} alignItems="flex-end">
          <Grid item>
            <i class="material-icons"> date_range </i>
          </Grid>
          <Grid item>
           <TextField
              id="datetime-local"
              name="date"
              onChange={this.handleChange}
              label="Journey date"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
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
Ride.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ride);
