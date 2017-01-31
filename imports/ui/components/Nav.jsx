import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

import { MdHome, MdPlaylistAddCheck, MdInsertChart, MdSettings, MdMenu, MdInfo } from 'react-icons/lib/md';

class Nav extends Component {
  constructor(props) {
    super(props);
    console.log('Navigation Loaded..');

    this.state = {
      snackbar: Session.get("snackbar"),
      message: Session.get("snackbarMessage"),
      open: false,
      openLogout: false
    }

    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);

    this.updateSnackbarText = this.updateSnackbarText.bind(this);

    this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCloseLogout = this.handleCloseLogout.bind(this);
    this.handleOpenLogout = this.handleOpenLogout.bind(this);

    this.routeProfile = this.routeProfile.bind(this);
    this.routeApplicationSettings = this.routeApplicationSettings.bind(this);
    this.routeAccountSettings = this.routeAccountSettings.bind(this);
    this.routeHome = this.routeHome.bind(this);
    this.routeTasks = this.routeTasks.bind(this);
    this.routeStats = this.routeStats.bind(this);
    this.routeSettings = this.routeSettings.bind(this);
    this.routeAbout = this.routeAbout.bind(this);
  }

  updateSnackbarText(value){
    this.setState({
      message: value
    });
  }

  openSnackbar(){
    this.setState({
      snackbar: true,
    });
  }

  closeSnackbar(){
    this.setState({
      snackbar: false,
    });
  }

  handleOpenDrawer(){
    this.setState({open: true});
  }

  handleCloseDrawer(){
    this.setState({open: false});
  }

  handleOpenLogout(){
    this.setState({openLogout: true});
  }

  handleCloseLogout(){
    this.setState({openLogout: false});
  }

  routeAbout(event){
    this.handleCloseDrawer();
    FlowRouter.go('/about');
  }

  routeProfile(event){
    event.preventDefault();

    this.handleCloseDrawer();
    FlowRouter.go('/profile');
  }

  routeApplicationSettings(event){
    event.preventDefault();

    this.handleCloseDrawer();
    FlowRouter.go('/appSettings');
  }

  routeAccountSettings(event){
    event.preventDefault();

    this.handleCloseDrawer();
    FlowRouter.go('/accSettings');
  }

  handleLogout(event){
    event.preventDefault();

    Meteor.logout(function(err){
      if(err) {
        this.updateSnackbarText('Logout Failed!');
        this.openSnackbar();
      } else {
        FlowRouter.go('/auth');
      }
    });
  }

  routeHome(event){
    event.preventDefault();

    this.handleCloseDrawer();
    FlowRouter.go('/');
  }

  routeTasks(event){
    event.preventDefault();

    this.handleCloseDrawer();
    FlowRouter.go('/tasks');
  }

  routeStats(event){
    event.preventDefault();

    this.handleCloseDrawer();
    FlowRouter.go('/stats');
  }

  routeSettings(event){
    event.preventDefault();

    FlowRouter.go('/settings');
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseLogout}
        />,
      <FlatButton
        label="Yeah, get me out"
        primary={true}
        onTouchTap={this.handleLogout}
        />,
    ];

    return (
      <MuiThemeProvider>
        <Flexbox className="Nav" id="Nav" style={{backgroundColor: this.props.color}}>
          <Flexbox className="drawerButton">
            <MdMenu onTouchTap={this.handleOpenDrawer}/>
          </Flexbox>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.openLogout}
            onRequestClose={this.handleCloseLogout}
            >
            Log out ?
          </Dialog>
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            className = "drawer"
            >
            <Card>
              <CardHeader
                title={ this.props.currentUser ? this.props.currentUser.username : 'error'}
                subtitle= { this.props.currentUser ? this.props.currentUser.emails[0].address : 'error'}
                avatar="/jsa-128.jpg"
                onTouchTap={this.routeProfile}
                className="drawerAnim1"
                />
              <CardActions>
                <FlatButton label="Settings" onTouchTap={this.routeAccountSettings}/>
                <FlatButton label="Logout" onTouchTap={this.handleOpenLogout}/>
              </CardActions>
            </Card>
            <MenuItem leftIcon={<MdHome />} onClick={this.routeHome}>Home</MenuItem>
            <MenuItem leftIcon={<MdPlaylistAddCheck />} onClick={this.routeTasks}>Tasks</MenuItem>
            <MenuItem leftIcon={<MdInsertChart />} onClick={this.routeStats}>Statistics</MenuItem>
            <MenuItem leftIcon={<MdInfo />} onClick={this.routeAbout}>About</MenuItem>
          </Drawer>
          <Snackbar
            open={this.state.snackbar}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.closeSnackbar}
          />
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}

Nav.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Nav);
