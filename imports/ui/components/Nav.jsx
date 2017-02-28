import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransition from 'react-addons-css-transition-group';


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
import Menu from 'material-ui/Menu';

class Nav extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  snackbar: Session.get("snackbar"),
	  message: Session.get("snackbarMessage"),
	  openLogout: false,
	  route: Session.get("route")
	}

	this.openSnackbar = this.openSnackbar.bind(this);
	this.closeSnackbar = this.closeSnackbar.bind(this);
	this.updateSnackbarText = this.updateSnackbarText.bind(this);

	this.handleLogout = this.handleLogout.bind(this);
	this.handleCloseLogout = this.handleCloseLogout.bind(this);
	this.handleOpenLogout = this.handleOpenLogout.bind(this);

	this.routeProfile = this.routeProfile.bind(this);
	this.routeHome = this.routeHome.bind(this);
	this.routeSettings = this.routeSettings.bind(this);

		this.getIcon = this.getIcon.bind(this);

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

  handleOpenLogout(){
	this.setState({openLogout: true});
  }

  handleCloseLogout(){
	this.setState({openLogout: false});
  }

  routeHome(){
	this.setState({
	  route: "timer"
	});
	Session.set({
	  "route": "timer"
	});
  }

  routeProfile(){
	  this.setState({
	  route: "statistics"
	});
	Session.set({
	  "route": "statistics"
	});
  }

  routeSettings(){
	this.setState({
	  route: "settings"
	});
	Session.set({
	  "route": "settings"
	});
  }

  getIcon(inp){
	route = this.state.route;
	console.log(route);
	if(route === inp){
	  return "selected button";
	}
	else{
		return "button";
	}
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
		<div className="navContainer">
		<Dialog actions={actions} modal={false} open={this.state.openLogout} onRequestClose={this.handleCloseLogout}>
			Are you sure ?
		</Dialog>
		
		<div className='menuBG'>
			<ReactCSSTransition
	  		transitionName = "fromTopLoad"
			transitionEnterTimeout = {600}
			transitionLeaveTimeout = {400}
	  	>
				<IconButton className ={this.getIcon("statistics")} iconClassName="fa fa-user-circle" style={{padding: '-12px'}} tooltip="Profile" onClick={this.routeProfile}/>
			</ReactCSSTransition>
	
				<ReactCSSTransition
	  		transitionName = "fromTopLoad"
			transitionEnterTimeout = {600}
			transitionLeaveTimeout = {400}
	  	>
				<IconButton className ={this.getIcon("timer")} iconClassName="fa fa-home" style={{padding: '-12px'}} tooltip="Home" onClick={this.routeHome}/>
			</ReactCSSTransition>
	
				<ReactCSSTransition
	  		transitionName = "fromTopLoad"
			transitionEnterTimeout = {600}
			transitionLeaveTimeout = {400}
	  	>
				<IconButton className ={this.getIcon("settings")} iconClassName="fa fa-cog" style={{padding: '-12px'}} tooltip="Settings" onClick={this.routeSettings}/>
			</ReactCSSTransition>
	
			<ReactCSSTransition
	  		transitionName = "fromTopLoad"
			transitionEnterTimeout = {600}
			transitionLeaveTimeout = {400}
	  	>
				<IconButton iconClassName="fa fa-sign-out" style={{padding: '-12px'}} tooltip="Log out" onClick={this.handleOpenLogout}/>
		  	</ReactCSSTransition>

		  </div>

		  <Snackbar
			open={this.state.snackbar}
			message={this.state.message}
			autoHideDuration={4000}
			onRequestClose={this.closeSnackbar}
		  />
		</div>
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
