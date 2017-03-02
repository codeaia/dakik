import React, { Component, constructor, State } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Loading from './Loading.jsx';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openLogout: false,
    }

  	this.handleLogout = this.handleLogout.bind(this);
  	this.handleCloseLogout = this.handleCloseLogout.bind(this);
  	this.handleOpenLogout = this.handleOpenLogout.bind(this);
  }

  handleOpenLogout(){
    this.setState({openLogout: true});
  }

  handleCloseLogout(){
    this.setState({openLogout: false});
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

    if (this.props.currentUser !== undefined) {
      return (
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title={ this.props.currentUser ? this.props.currentUser.username : 'error'}
              subtitle= { this.props.currentUser ? this.props.currentUser.emails[0].address : 'error'}
              avatar="/jsa-128.jpg"
            />
            <CardTitle title="İstatistiklerin"/>
            <CardText>
              Task Record: {this.props.currentUser.profile.taskCount ? this.props.currentUser.profile.taskCount : 0}<br/>
              Pomo Record: {this.props.currentUser.profile.pomoCount ? this.props.currentUser.profile.pomoCount : 0}<br/>
            </CardText>
            <CardActions>
              <IconButton iconClassName="fa fa-sign-out" style={{padding: '-12px'}} tooltip="Log out" onClick={this.handleOpenLogout}/>
            </CardActions>
          <Dialog actions={actions} modal={false} open={this.state.openLogout} onRequestClose={this.handleCloseLogout}>
            Are you sure ?
          </Dialog>
          </Card>
        </MuiThemeProvider>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}
