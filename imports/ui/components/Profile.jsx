import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import { Accounts } from 'meteor/accounts-base';

import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import StatisticsContainer from './Statistics.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import { Image, Header, Segment, Label, Icon, Input, Form } from 'semantic-ui-react';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openLogout: false,
      oldPassword: "",
      newPassword: "",
      username: "",
      email: ""
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleCloseLogout = this.handleCloseLogout.bind(this);
    this.handleOpenLogout = this.handleOpenLogout.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.oldPassword = this.oldPassword.bind(this);
    this.newPassword = this.newPassword.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.email = this.email.bind(this);
    this.username = this.username.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  oldPassword(event, data) {
    this.setState({
      oldPassword: data.value
    });
  }

  newPassword(event, data) {
    this.setState({
      newPassword: data.value
    });
  }

  email(event, data) {
    this.setState({
      email: data.value
    });
  }

  username(event, data) {
    this.setState({
      username: data.value
    });
  }

  changePassword(e) {
    e.preventDefault();

    if(this.state.oldPassword.toString().length !== 0 && this.state.newPassword.toString().length !== 0) {
      Accounts.changePassword(this.state.oldPassword, this.state.newPassword, function(error) {
        if(error !== undefined && error.reason === "Incorrect password") {
          console.log("Incorrect Password!");
        } else {
          console.log("Password is changed!");
        }
      });
    } else {
      console.log("EMPTY");
    }
  }

  addEmail(e) {
    e.preventDefault();

    if(this.state.email.toString().length !== 0) {
      Meteor.call("addEmail", Meteor.user()._id, this.state.email, function(error) {
        if(error !== undefined && error.reason === "Email already exists.") {
          console.log("This email is already exists.");
        }
      });
    } else {
      console.log("EMPTY");
    }
  }

  changeUsername(e) {
    e.preventDefault();

    console.log(Meteor.user());

    if(this.state.username.toString().length !== 0) {
      Meteor.call("changeUsername", Meteor.user()._id, this.state.username, function(error) {
        if(error !== undefined && error.reason === "Username already exists.") {
          console.log("Username is already exists.");
        }
      });
    } else {
      console.log("EMPTY");
    }
  }

  handleOpenLogout(){
    this.setState({openLogout: true});
  }

  handleCloseLogout(){
    this.setState({openLogout: false});
  }

  handleLogout(){
    Meteor.logout();
    this.props.history.push('/auth');
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
          <Flexbox flexDirection="column" className="container profile">
            <Segment>
              <div className = "profileTop">
                <Header as='h4' image>
                  <Image src='/jsa-128.jpg' shape='circular' size='big' />
                  <Header.Content>
                    {this.props.user.username}
                    <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
                  </Header.Content>
                </Header>
                <IconButton iconClassName="fa fa-sign-out" style={{padding: '-12px'}} tooltip="Log out" onClick={this.handleOpenLogout}/>
              </div>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} onChange={this.oldPassword} placeholder='Old Password' />
                  <Form.Field control={Input} onChange={this.newPassword} placeholder='New Password' />
                  <Form.Button onClick={this.changePassword}>Change The Password</Form.Button>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} onChange={this.username} placeholder='New Username' />
                  <Form.Button onClick={this.changeUsername}>Change The Username</Form.Button>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field control={Input} onChange={this.email} placeholder='New Email' />
                  <Form.Button onClick={this.addEmail}>Add New Email</Form.Button>
                </Form.Group>
              </Form>
              <h2>Statistics</h2>
              <CardText>
                Finished Tasks: {this.props.dailyStat ? this.props.dailyStat.finishedTaskCount: 0}<br/>
              Finished Pomos: {this.props.dailyStat ? this.props.dailyStat.finishedPomoCount: 0}<br/>
            <StatisticsContainer />
          </CardText>
          <Dialog actions={actions} modal={false} open={this.state.openLogout} onRequestClose={this.handleCloseLogout}>
            Are you sure ?
          </Dialog>
        </Segment>
      </Flexbox>
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
  Meteor.subscribe('dailyStat');
  const user = Meteor.users.findOne(Meteor.userId(), {profile: 1, username: 1, emails: 1});
  const dailyStat = Stats.findOne();
  return{
    user,
    dailyStat,
  };
}, Profile);
