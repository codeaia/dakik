import React, { Component, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Loading from './Loading.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';

class Profile extends Component {
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

    if (this.props.user) {
      return (
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title={this.props.user.username}
              subtitle= {this.props.user.emails[0].address}
              avatar="/jsa-128.jpg"
            />
            <CardTitle title="Statistics"/>
            <CardText>
              Tasks Created: {this.props.user.profile.statistics.taskCount}<br/>
              Tasks Integrated With Trello: {this.props.user.profile.statistics.trelloTasksCount}<br/>
              Tasks Integrated With Wunderlist: {this.props.user.profile.statistics.wunderlistTasksCount}<br/>
              Completed Tasks: {this.props.user.profile.statistics.taskCount - this.props.user.profile.statistics.incompleteTasks}<br/>
              Incomplete Tasks: {this.props.user.profile.statistics.incompleteTasks}<br/>
              Finished Pomos: {this.props.user.profile.statistics.completedPomos}<br/>
              Estimated Pomos: {this.props.user.profile.statistics.estimatedPomos}<br/>
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

export default ProfileContainer = createContainer(() => {
  const user = Meteor.users.findOne(Meteor.userId(), {profile: 1, username: 1, emails: 1});
  return{
    user,
  };
}, Profile);
