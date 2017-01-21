import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import { MdHome, MdPlaylistAddCheck, MdInsertChart, MdSettings, MdMenu } from 'react-icons/lib/md';

class Nav extends Component {
  constructor(props) {
    super(props);
    console.log('Navigation Loaded..');

    this.state = {
      open: false,
      openLogout: false,
      disabled: false,
      disabled2: false
    }

    Trello.authorize({
      interactive:false,
    });

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

    this.connectToTrello = this.connectToTrello.bind(this);
    this.onAuthorize = this.onAuthorize.bind(this);
    this.exitFromTrello = this.exitFromTrello.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleDisabled2 = this.handleDisabled2.bind(this);

    var isLoggedIn = Trello.authorized();
    if(isLoggedIn) {
      this.state = {
        open: false,
        openLogout: false,
        disabled: true,
        disabled2: false
      }
    } else {
      this.state = {
        open: false,
        openLogout: false,
        disabled: false,
        disabled2: true
      }
    }
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

  connectToTrello(){
    Trello.authorize({
      name: "PROJECT",
      type: "popup",
      persist: false,
      success: this.onAuthorize
    })
  }

  handleDisabled() {
    this.setState({disabled: !this.state.disabled});
  }
  handleDisabled2() {
    this.setState({disabled2: !this.state.disabled2});
  }

  updateLogin() {
    var isLoggedIn = Trello.authorized();
    $(".exit").toggle(isLoggedIn);
    $(".connect").toggle(!isLoggedIn);
  }

  exitFromTrello() {
    Trello.deauthorize();
    this.handleDisabled2();
    this.handleDisabled();
  }

  onAuthorize() {
    this.handleDisabled();
    this.handleDisabled2();
    console.log('OK');
  }

  handleCloseLogout(){
    this.setState({openLogout: false});
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
        Bert.alert({
          type: 'danger',
          style: 'growl-top-right',
          message: 'Logout Failed!',
          icon: 'fa-sign-in'
        });
      } else {
        Bert.alert({
          type: 'info',
          style: 'growl-top-right',
          message: 'You have successfully logged out!',
          icon: 'fa-sign-in'
        });
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
                onTouchTap={this.routeProfile}
                className="drawerAnim1"
                />
              <CardActions>
                <FlatButton label="Settings" onTouchTap={this.routeAccountSettings}/>
                <FlatButton label="Logout" onTouchTap={this.handleOpenLogout}/>
                <FlatButton disabled={this.state.disabled} className="connect" label="Trello" onTouchTap={this.connectToTrello}/>
                <FlatButton disabled={this.state.disabled2} className="exit" label="Exit" onTouchTap={this.exitFromTrello}/>
              </CardActions>
            </Card>
            <MenuItem leftIcon={<MdHome />} onClick={this.routeHome}>Home</MenuItem>
            <MenuItem leftIcon={<MdPlaylistAddCheck />} onClick={this.routeTasks}>Tasks</MenuItem>
            <MenuItem leftIcon={<MdInsertChart />} onClick={this.routeStats}>Statistics</MenuItem>
          </Drawer>
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
