import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';

export default class Nav extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  snackbar: Session.get("snackbar"),
	  message: Session.get("snackbarMessage"),
	  topBorder: Session.get("route")
	}

	this.openSnackbar = this.openSnackbar.bind(this);
	this.closeSnackbar = this.closeSnackbar.bind(this);
	this.updateSnackbarText = this.updateSnackbarText.bind(this);

	this.routeProfile = this.routeProfile.bind(this);
	this.routeHome = this.routeHome.bind(this);
	this.routeSettings = this.routeSettings.bind(this);
  this.routeAbout = this.routeAbout.bind(this);

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

  routeHome(){
  	this.setState({
  	  topBorder: "timer"
  	});

  	Session.set({
  	  "route": "timer"
  	});
  }

  routeProfile(){
  	this.setState({
  	  topBorder: "statistics"
  	});

  	Session.set({
  	  "route": "statistics"
  	});
  }

  routeSettings(){
  	this.setState({
  	  topBorder: "settings"
  	});

  	Session.set({
  	  "route": "settings"
  	});
  }

  getIcon(value){
  	const topBorder = this.state.topBorder;

    if(topBorder == value){
  	  return "selected navButton";
  	} else{
  	  return "button";
  	}
  }

  routeAbout(){
    this.setState({
  	  topBorder: "about"
  	});

  	Session.set({
  	  "route": "about"
  	});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="navContainer">
          <div className='menuBG'>
            <IconButton className={this.getIcon("statistics")} iconClassName="fa fa-user-circle" style={{padding: '-12px'}} tooltip="Profile" onClick={this.routeProfile}/>
            <IconButton className={this.getIcon("timer")} iconClassName="fa fa-home" style={{padding: '-12px'}} tooltip="Home" onClick={this.routeHome}/>
            <IconButton className={this.getIcon("settings")} iconClassName="fa fa-cog" style={{padding: '-12px'}} tooltip="Settings" onClick={this.routeSettings}/>
            <IconButton className={this.getIcon("about")} iconClassName="fa fa-info-circle" style={{padding: '-12px'}} tooltip="About" onClick={this.routeAbout}/>
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
