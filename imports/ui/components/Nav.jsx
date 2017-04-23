import React, { Component, constructor } from 'react';
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
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  topBorder: Session.get("route")
  	}

    this.setIcon = this.setIcon.bind(this);
  	this.getIcon = this.getIcon.bind(this);
  }

  setIcon(value){
  	this.setState({
  	  topBorder: value
  	});
  }

  getIcon(value){
    if(this.state.topBorder === value){
  	  return "selected navButton";
  	} else{
  	  return "button";
  	}
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="navContainer">
          <div className='menuBG'>
            <Link to="/">
              <IconButton className={this.getIcon("timer")}  iconClassName="fa fa-clock-o" style={{padding: '-12px'}} tooltip="Home" onClick={() => this.setIcon("timer")}/>
            </Link>
			<Link to="/profile">
			  <IconButton className={this.getIcon("statistics")} iconClassName="fa fa-user-circle" style={{padding: '-12px'}} tooltip="Profile" onClick={() => this.setIcon("statistics")}/>
			</Link>
            <Link to="/settings">
              <IconButton className={this.getIcon("settings")} iconClassName="fa fa-cog" style={{padding: '-12px'}} tooltip="Settings" onClick={() => this.setIcon("settings")}/>
            </Link>
            <Link to="/about">
            <IconButton className={this.getIcon("about")}  iconClassName="fa fa-info-circle" style={{padding: '-12px'}} tooltip="About" onClick={() => this.setIcon("about")}/>
            </Link>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
