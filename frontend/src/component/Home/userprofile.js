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
import Img from './profile.jpg';

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
  h1:{
    'textAlign':'center',
    'fontSize':'420%',
    'color':'#ffffff',
    'fontFamily': 'Source Sans Pro',
  },
  driver:{
    'width': '80%',
    'min-height': '450px',
    'margin': '0 auto',
    'padding': '20px',
    'background-color': 'rgba(255, 255, 255, 0.7)',

  },
  divleft:{
    'width': '60%',
    'display': 'block',
    'margin': '0 auto',
    'padding': '10px',
  },
  headText:{
    'color': '#333',
    'textAlign': 'center',
  },
  mainSection:{
    'float': 'left',
    'width': '100%',
  },
  divForm:{
    'float': 'left',
    'width': '50%',
  },
  divTo:{
    'float': 'left',
    'width': '50%',
  },
  divPara:{
    'margin': '0',
    'fontSize': '16px',
  },

}




export default class UserProfile extends React.Component {
  state = {
    user: [],
  };
  componentWillMount() {
    if (!this.props.token) this.props.history.push('/');

    const token = window.localStorage.access_token;
    console.log(token)
    axios({
              method: 'get',
              url: 'http://127.0.0.1:8000/api/v1/profile/2/',
              headers: {'Authorization': `Token ${token}` }
              })
            .then(function (response,status, xhr) {
                console.log(response);
                if (response.status === 200) {
                  this.setState({
                    user: response.data.user,
                  });

                }
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log(response);
            });
  }

  render() {
    const { classes } = this.props;
    const data= this.state
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
     <div style={style.mainSection}>
          <h2 style={style.headText}>UserProfile</h2>
            <div style={style.divleft}>
              <Paper style={style.driver} elevation={1}>
                  <Typography variant="headline" namecomponent="h3">
                  <div>
                    <h3 style={{fontWeight: '400', margin: '0'}}>First Name :<span style={style.divPara}>{data.user.first_name} {data.user.last_name}</span></h3>
                    <Typography component="p">
                      <p><strong>User Name :</strong> {data.user.username} </p>
                    </Typography>
                    <Typography component="p">
                      <p><strong>Phone Number :</strong> {data.user.phone_number}</p>
                    </Typography>
                  </div>
                  <div>
                    <Typography component="p">
                      <p><strong>Email :</strong> {data.user.email}</p>
                    </Typography>
                {data.user.user_type === 2 ? (
                    <Typography component="p">
                      <p><strong>driver_license :</strong> {data.user.driver_license}</p>
                      <p><strong>car_year :</strong> {data.user.car_year}</p>
                      <p><strong>car_makes :</strong> {data.user.car_makes}</p>
                      <p><strong>car_model :</strong> {data.user.car_model}</p>
                      <p><strong>User Type :</strong> Driver</p>

                    </Typography>):
                    (<Typography component="p">
                      <p><strong>User Identification :</strong> {data.user.clientIdentification}</p>
                      <p><strong>User Type :</strong> Client</p>

                    </Typography>)}
                  </div>
                  </Typography>
              </Paper>
            </div>
      </div>
    </div>
  );
}
}


