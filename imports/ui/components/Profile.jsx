import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Image, Header, Segment, Label, Icon, Card, Form, Input, Button, Menu } from 'semantic-ui-react';

import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import StatisticsContainer from './Statistics.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      username: '',
      email: ''
    }

  	this.handleLogout = this.handleLogout.bind(this);
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

  handleLogout(){
    Meteor.logout(() => this.props.history.push('/auth'));
  }

  render() {
    if (this.props.user) {
      return (
        <Card className="profile">
          <Card.Content header={
            <div className="profileTop">
              <Header as='h4' image>
                <Image src='/jsa-128.jpg' shape='circular' size='big' />
                <Header.Content>
                  {this.props.user.username}
                  <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
                </Header.Content>
              </Header>
              <Button
                icon={<Icon link as="span" className='fa fa-sign-out'/>}
                content='Logout'
                labelPosition='left'
                basic
                color='red'
                className="logout animated fadeIn"
                onClick={this.handleLogout}
              />
            </div>
          } />
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
          <Card.Content description={
            <div>
              <h4>Today's Stats</h4>
              Finished Tasks: {this.props.dailyStat ? this.props.dailyStat.finishedTaskCount: 0}<br/>
              Finished Pomos: {this.props.dailyStat ? this.props.dailyStat.finishedPomoCount: 0}<br/>
              <StatisticsContainer />
            </div>
          }/>
        </Card>
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
