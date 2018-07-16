import React, { Component } from 'react';
import {BrowserRouter as Router,  Switch,Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const style = {
  h1:{
    'textAlign':'center',
    'fontSize':'420%',
    'color':'#ffffff',
    'fontFamily': 'Source Sans Pro',
  },
  driver:{
    'width': '80%',
    'min-height': '100px',
    'margin': '0 auto',
    'padding': '20px',
    'background-color': 'rgba(255, 255, 255, 0.7)',

  },
  client:{
    'width': '80%',
    'height': '100px',
    'margin': '0 auto',
    'padding': '20px',
  },
  divright:{
    'width': '80%',
    'display': 'block',
    'margin': '0 auto',
    'padding': '10px',
  },
  divleft:{
    'width': '80%',
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
    'width': '50%',
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


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});



export default class Profile extends Component{
  state = {
    client: [],
    driver: [],
  };
  componentWillMount() {
    const token = window.localStorage.access_token;
    if (!token) this.props.history.push('/');
    console.log(token)
    axios({
              method: 'get',
              url: 'http://127.0.0.1:8000/api/v1/rides/',
              headers: {'Authorization': `Token ${token}` }
              })
            .then(function (response,status, xhr) {
                console.log(response);
                if (response.status === 200) {
                  this.setState({
                    client: response.data.client,
                  });
                  this.setState({
                    driver: response.data.driver,
                  });
                }
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log(response);
            });
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <div style={style.mainSection}>
          <h2 style={style.headText}>Available Rides</h2>
          {this.state.driver.map(singleResponse =>
            <div style={style.divleft}>
              <Paper style={style.driver} elevation={1}>
                  <Typography variant="headline" id = {singleResponse.id} namecomponent="h3">
                  <div style={style.divTo}>
                    <h3 style={{fontWeight: '500', margin: '0'}}>To <span style={style.divPara}>{singleResponse.start_ride}</span></h3>
                    <Typography component="p">
                      <p><strong>Date</strong> {singleResponse.date} </p>
                    </Typography>
                    <Typography component="p">
                      <p><strong>Place</strong> {singleResponse.place}</p>
                    </Typography>
                  </div>
                  <div style={style.divForm}>

                    <h3 style={{fontWeight: '500', margin: '0'}}>From <span style={style.divPara}>{singleResponse.end_ride}</span></h3>
                    <Typography component="p">
                      <p><strong>No. of seats</strong> {singleResponse.no_of_seates}</p>
                    </Typography>
                    <Typography component="p">
                      <p><strong>Fair Price</strong> {singleResponse.cost}</p>
                    </Typography>
                  </div>
                  </Typography>
              </Paper>
            </div>
          )}
        </div>
        <div style={style.mainSection}>
          <h2 style={style.headText}>Requested Rides</h2>
          {this.state.client.map(singleResponse =>
            <div style={style.divright}>
              <Paper style={style.driver} elevation={1}>
                  <Typography variant="headline" id = {singleResponse.id} namecomponent="h3">
                  <div style={style.divTo}>
                    <h3 style={{fontWeight: '500', margin: '0'}}>To <span style={style.divPara}>{singleResponse.start_ride}</span></h3>
                    <Typography component="p">
                      <p><strong>Date</strong> {singleResponse.date} </p>
                    </Typography>
                    <Typography component="p">
                      <p><strong>Place</strong> {singleResponse.place}</p>
                    </Typography>
                  </div>
                  <div style={style.divForm}>

                    <h3 style={{fontWeight: '500', margin: '0'}}>From <span style={style.divPara}>{singleResponse.end_ride}</span></h3>
                    <Typography component="p">
                      <p><strong>No. of seats</strong> {singleResponse.no_of_seates}</p>
                    </Typography>
                    <Typography component="p">
                      <p><strong>Fair Price</strong> {singleResponse.cost}</p>
                    </Typography>
                  </div>
                  </Typography>
              </Paper>
            </div>
          )}
        </div>
      </div>
      )
  }
}
