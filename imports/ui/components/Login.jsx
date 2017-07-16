import React, { Component } from 'react';
import { Button, Checkbox, Input, Card, Statistic, Modal, Header, Message } from 'semantic-ui-react';
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
        <Modal trigger={<Statistic className='authData' size='mini' value='v1.7.8'/>}>
          <Modal.Header>Latest News and Basic Info</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Message
                floating
                info
                header='Features'
                list={[
                  'Providing in-app todo-list in which users can create, update, delete their tasks in one application.',
                  'In-app timer to let users manage their tasks.',
                  'Independent of platform; meaning that users can access our application from web, mobile, and desktop (coming soon).',
                  'Integration of similar task management applications such as <b>trello</b> and <b>wunderlist',
                  'Providing visual statistics of our users actions like the percentage of completed tasks.'
                ]}
              />
              <Message
                floating
                success
                header='Patch Notes'
                list={[
                  'Latest news informer is added to auth pages in order to supply quick information',
                  'Toggling completed tasks is re-added.',
                  'Some packages get updated.',
                ]}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
