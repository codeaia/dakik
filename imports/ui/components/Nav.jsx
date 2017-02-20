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
import IconButton from 'material-ui/IconButton';

class Nav extends Component {
  constructor(props) {
    super(props);

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
    this.routeHome = this.routeHome.bind(this);
    this.routeTasks = this.routeTasks.bind(this);
    this.routeStatistics = this.routeStatistics.bind(this);
    this.routeSettings = this.routeSettings.bind(this);
    this.routeAbout = this.routeAbout.bind(this);
    this.routeIntegrations = this.routeIntegrations.bind(this);
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

  routeAbout(){
    this.handleCloseDrawer();
    FlowRouter.go('/about');
  }

  routeProfile(){
    this.handleCloseDrawer();
    FlowRouter.go('/profile');
  }

  routeSettings(){

    this.handleCloseDrawer();
    FlowRouter.go('/settings');
  }

  handleLogout(){
    Meteor.logout(function(err){
      if(err) {
        this.updateSnackbarText('Logout Failed!');
        this.openSnackbar();
      } else {
        FlowRouter.go('/auth');
      }
    });
  }

  routeHome(){
    this.handleCloseDrawer();
    FlowRouter.go('/');
  }

  routeTasks(){
    this.handleCloseDrawer();
    FlowRouter.go('/tasks');
  }

  routeIntegrations(){
    this.handleCloseDrawer();
    FlowRouter.go('/integrations');
  }

  routeStatistics(){
    this.handleCloseDrawer();
    FlowRouter.go('/statistics');
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseLogout}
        />,
      <FlatButton
        label="Log out"
        primary={true}
        onTouchTap={this.handleLogout}
        />,
    ];

    return (
      <MuiThemeProvider>
        <Flexbox className="Nav" id="Nav" style={{backgroundColor: this.props.color}}>
          <Flexbox className="drawerButton">
            <IconButton iconClassName="fa fa-bars" onTouchTap={this.handleOpenDrawer}/>
          </Flexbox>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.openLogout}
            onRequestClose={this.handleCloseLogout}
            >
            Are you sure ?
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
                <IconButton iconClassName="fa fa-cog" style={{padding: '-12px'}} onClick={this.routeSettings} tooltip="Settings"/>
                <IconButton iconClassName="fa fa-sign-out" style={{padding: '-12px'}} onClick={this.handleOpenLogout} tooltip="Log out"/>
              </CardActions>
            </Card>
            <MenuItem leftIcon={<IconButton iconClassName="fa fa-home" style={{padding: '-12px'}}/>} onClick={this.routeHome}>Home</MenuItem>
            <MenuItem leftIcon={<IconButton iconClassName="fa fa-list-ul" style={{padding: '-12px'}}/>} onClick={this.routeTasks}>Tasks</MenuItem>
            <MenuItem leftIcon={<IconButton iconClassName="fa fa-link" style={{padding: '-12px'}}/>} onClick={this.routeIntegrations}>Integrations</MenuItem>
            <MenuItem leftIcon={<IconButton iconClassName="fa fa-bar-chart" style={{padding: '-12px'}}/>} onClick={this.routeStatistics}>Statistics</MenuItem>
            <MenuItem leftIcon={<IconButton iconClassName="fa fa-info-circle" style={{padding: '-12px'}}/>} onClick={this.routeAbout}>About</MenuItem>
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
