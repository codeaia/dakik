import React, { Component } from 'react';
import { Grid, Menu, Segment, Icon, Form, Input } from 'semantic-ui-react';
import Noty from 'noty';

import TrelloApiContainer from './TrelloApi.jsx';
import WunderlistApiContainer from './WunderlistApi.jsx';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      username: '',
      email: ''
    }

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
          new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
            text: 'Password is wrong.',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        } else {
          new Noty({
            type: 'success',
            layout: 'topRight',
            theme: 'sunset',
            text: 'You have successfully changed your password.',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        }
      });
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'You must enter both old and new passwords.',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
    }
  }

  addEmail(e) {
    e.preventDefault();
    if(this.state.email.toString().length !== 0) {
      Meteor.call("addEmail", Meteor.user()._id, this.state.email, function(error) {
        if(error !== undefined && error.reason === "Email already exists.") {
          new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
            text: 'This email already exists.',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        }
      });
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'You must enter an email.',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
    }
  }

  changeUsername(e) {
    e.preventDefault();
    if(this.state.username.toString().length !== 0) {
      Meteor.call("changeUsername", Meteor.user()._id, this.state.username, function(error) {
        if(error !== undefined && error.reason === "Username already exists.") {
          new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
            text: 'This username already exists.',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        }
      });
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'You must enter a new username.',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
    }
  }

  render() {
    return (
      <Segment className="settingsContainer">
        <Grid className="settingsGrid">
          <Grid.Column width={4} className="settingsActions">
            <Menu pointing secondary vertical>
              <Menu.Item name='account' active={this.props.location.pathname === "/settings/account" ? true : false} onClick={() => this.props.history.push('/settings/account')}>Settings</Menu.Item>
              <Menu.Item name='trello' active={this.props.location.pathname === "/settings/trello" ? true : false} onClick={() => this.props.history.push('/settings/trello')}>Trello</Menu.Item>
              <Menu.Item name='wunderlist' active={this.props.location.pathname === "/settings/wunderlist" ? true : false} onClick={() => this.props.history.push('/settings/wunderlist')}>Wunderlist</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12} className="settingsContent">
            {this.props.location.pathname === "/settings/account" ?
              <Segment className="sementicSegment">
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} type='password' onChange={this.oldPassword} placeholder='Enter you old password' />
                    <Form.Field control={Input} type='password' onChange={this.newPassword} placeholder='Enter a new password' />
                    <Form.Button onClick={this.changePassword}>Change The Password</Form.Button>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} onChange={this.username} placeholder='Enter new username' />
                    <Form.Button onClick={this.changeUsername}>Change The Username</Form.Button>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} onChange={this.email} placeholder='Enter new email' />
                    <Form.Button onClick={this.addEmail}>Add New Email</Form.Button>
                  </Form.Group>
                </Form>
              </Segment>
            : ""}
            {this.props.location.pathname === "/settings/trello" ?
              <Segment className="sementicSegment">
                <TrelloApiContainer history={this.props.history} />
              </Segment>
            : ""}
            {this.props.location.pathname === "/settings/wunderlist" ?
              <Segment className="sementicSegment">
                <WunderlistApiContainer history={this.props.history} />
              </Segment>
            : ""}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
