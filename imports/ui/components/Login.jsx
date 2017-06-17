import React, { Component } from 'react';
import { Button, Checkbox, Input, Card } from 'semantic-ui-react';
import Noty from 'noty';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.login = this.login.bind(this);
  }

  updateUsername(event, data){
    this.setState({
      username: data.value
    });
  }

  updatePassword(event, data){
    this.setState({
      password: data.value
    });
  }

  login(){
    if (this.state.username.toString().length === 0) {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Please enter a username',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
      return false;
    } else if (this.state.password.toString().length === 0) {
      new Noty({
        type: 'information',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Please enter a password',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
      return false;
    } else {
      Meteor.loginWithPassword(this.state.username, this.state.password, (error, data) => {
        this.props.history.push('/');
      });
    }
  }

  render() {
    return (
      <div className='loginContainer'>
        <div className="logo">
          <img src="dakik_logo.svg" alt=""/>
        </div>
        <Card className="login">
          <Card.Content>
            <Input fluid value={this.state.username} onChange={this.updateUsername} placeholder='Username' /><br/>
            <Input fluid value={this.state.password} onChange={this.updatePassword} type='password' placeholder='Password' /><br/>
            <Button fluid onClick={() => this.login()} color='teal' floated='right' type='submit'>Login</Button>
          </Card.Content>
          <Card.Content>
            Don't have an account ? <p className='authActions' onClick={() => this.props.history.push('/register')}>Register</p>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
