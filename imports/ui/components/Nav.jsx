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

export default class Nav extends Component {
  constructor(props) {
    super(props);
    console.log('Navigation Loaded..');

    this.state = {
      home: false,
      tasks: false,
      stats: false,
      settings: false,
      open: false,
      openLogout: false
    }

    props = {
      color: "",
    };

    this.handleClose = this.handleClose.bind(this);
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

  }

  handleToggle(){
    this.setState({
      open: !this.state.open
    });
  }

  handleClose(){
    this.setState({
      open: false
    });
  }

  handleOpenLogout(){
    this.setState({openLogout: true});
  };

  handleCloseLogout(){
    this.setState({openLogout: false});
  };

  routeProfile(event){
    event.preventDefault();

    this.setState({
      home: false,
      tasks: false,
      stats: false,
      settings: true
    });

    this.handleClose();
    FlowRouter.go('/profile');
  }

  routeApplicationSettings(event){
    event.preventDefault();

    this.setState({
      home: false,
      tasks: false,
      stats: false,
      settings: true
    });

    this.handleClose();
    FlowRouter.go('/appSettings');
  }

  routeAccountSettings(event){
    event.preventDefault();

    this.setState({
      home: false,
      tasks: false,
      stats: false,
      settings: true
    });

    this.handleClose();
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
    this.setState({
      home: true,
      tasks: false,
      stats: false,
      settings: false
    });
    FlowRouter.go('/');
  }

  routeTasks(event){
    event.preventDefault();
    this.setState({
      home: false,
      tasks: true,
      stats: false,
      settings: false
    });
    FlowRouter.go('/tasks');
  }

  routeStats(event){
    event.preventDefault();
    this.setState({
      home: false,
      tasks: false,
      stats: true,
      settings: false
    });
    FlowRouter.go('/stats');
  }

  routeSettings(event){
    event.preventDefault();
    this.setState({
      home: false,
      tasks: false,
      stats: false,
      settings: true
    });
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
          <Flexbox>
            <MdMenu onClick={this.handleToggle}/>
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
                title="Placeholder"
                subtitle="Subtitle"
                avatar="assets/jsa-128.jpg"
                onTouchTap={this.routeProfile}
                className="drawerAnim1"
                />
              <CardActions>
                <FlatButton label="Settings" onTouchTap={this.routeAccountSettings}/>
                <FlatButton label="Logout" onTouchTap={this.handleOpenLogout}/>
              </CardActions>
            </Card>
            <MenuItem leftIcon={<MdHome />} onClick={this.routeHome}>Homes</MenuItem>
            <MenuItem leftIcon={<MdPlaylistAddCheck />} onClick={this.routeTasks}>Tasks</MenuItem>
            <MenuItem leftIcon={<MdInsertChart />} onClick={this.routeStats}>Statistics</MenuItem>
          </Drawer>
        </Flexbox>
      </MuiThemeProvider>
    );
  }

}
