import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Login from './login.js';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import MenuList from '@material-ui/core/MenuList';
import {BrowserRouter as Router,Route } from 'react-router-dom';



const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {

  componentwillupdate () {
    debugger;
    if (this.props.token) this.props.createSecuredRoutes();
  }

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const MakeRide = () => (
        <Route render={({ history}) => (
          <p onClick={() => { history.push('/data') }} >
           Place a Ride
          </p>
        )} />
      )

    const ChangePassword = () => (
        <Route render={({ history}) => (
          <p onClick={() => { history.push('/change-password') }} >
           Change Password
          </p>
        )} />
      )
   const UserProfile = () => (
      <Route render={({ history}) => (
        <p onClick={() => { history.push('/user-profile') }} >
         Profile
        </p>
      )} />
    )

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: 'lightcoral'}}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Car Ride Sharing
          </Typography>
          <div>
          <Manager>
            <Target>
                <IconButton
                  aria-owns='menu-appbar'
                  aria-haspopup="true"
                  color="inherit"
                  onClick={this.handleToggle}
                >
                  <AccountCircle />
                </IconButton>
            </Target>

                <Popper
                  placement="bottom-start"
                  eventsEnabled={open}
                  className={classNames({ [classes.popperClose]: !open })}
                >
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                      <Paper>
                        <MenuList role="menu">
                          <MenuItem onClick={this.handleClose}><UserProfile/></MenuItem>

                          <MenuItem onClick={this.handleClose}><ChangePassword/></MenuItem>

                          <MenuItem onClick={this.handleClose}><MakeRide/></MenuItem>

                          <MenuItem onClick={() => this.props.removeToken()}>Logout</MenuItem>
                        </MenuList>
                      </Paper>
                    </Grow>
                  </ClickAwayListener>
                </Popper>
          </Manager>

              </div>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  removeToken: PropTypes.func,
};

export default withStyles(styles)(MenuAppBar);
