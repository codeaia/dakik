import React, { Component } from 'react';
import { Button, Checkbox, Input, Card } from 'semantic-ui-react';
import Noty from 'noty';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      checked: false,
      password: '',
      password2: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePassword2 = this.updatePassword2.bind(this);
    this.register = this.register.bind(this);
  }

  updateUsername(event, data){
    this.setState({
      username: data.value
    });
  }

  updateEmail(event, data){
    this.setState({
      email: data.value
    });
  }

  updatePassword(event, data){
    this.setState({
      password: data.value
    });
  }

  updatePassword2(event, data){
    this.setState({
      password2: data.value
    });
  }

  toggle(){
    this.setState({
      checked: !this.state.checked
    });
  }

  register(){
    if (this.state.username.toString().length === 0) {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'You must enter your username.',
        timeout: 1000,
        progressBar: true,
        closeWith: ['click', 'button'],
        animation: {
          open: 'noty_effects_open',
          close: 'noty_effects_close'
        }
      }).show();
      return false;
    } else if(this.state.email.toString().length === 0) {
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
      return false;
    } else if (this.state.password.toString().length === 0 && this.state.password2.toString().length === 0) {
      new Noty({
        type: 'information',
        layout: 'topRight',
        theme: 'sunset',
        text: 'You must enter your password.',
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
      if (this.state.password == this.state.password2 ) {
        if (this.state.checked) {
          Accounts.createUser({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            profile: {
              hideCompleted: false,
              playing: false,
              timerDue: null,
              currentTaskId: null,
            }
          }, (error, data) => {
            this.props.history.push('/');
          });
        } else {
          new Noty({
            type: 'information',
            layout: 'topRight',
            theme: 'sunset',
            text: 'You must accept the terms and conditions.',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        }
      } else {
        new Noty({
          type: 'information',
          layout: 'topRight',
          theme: 'sunset',
          text: 'Passwords do not match!',
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
  };

  render() {
    return (
      <div className='registerContainer'>
        <div className="logo">
          <img src="dakik_logo.svg" alt=""/>
        </div>
        <Card className="register">
          <Card.Content>
            <Input fluid value={this.state.username} onChange={this.updateUsername} placeholder='Username' /><br/>
            <Input fluid value={this.state.email} onChange={this.updateEmail} placeholder='Email' /><br/>
            <Input fluid value={this.state.password} onChange={this.updatePassword} type='password' placeholder='Password' /><br/>
            <Input fluid value={this.state.password2} onChange={this.updatePassword2} type='password' placeholder='Password Again' /><br/>
            <Checkbox checked={this.state.checked} onChange={this.toggle} label='I agree to the Terms and Conditions' /><br/><br/>
            <Button fluid onClick={() => this.register()} color='teal' floated='right' type='submit'>Register</Button>
          </Card.Content>
          <Card.Content>
            Already have an account ? <p className='authActions' onClick={() => this.props.history.push('/login')}>Login</p>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
