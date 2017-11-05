import React, { Component } from 'react';
import { Button, Checkbox, Input, Card, Statistic, Modal, Header, Message } from 'semantic-ui-react';
import Noty from 'noty';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.location.state.username,
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
    if (this.state.username.toString().length !== 0 && this.state.email.toString().length !== 0 && this.state.password.toString().length !== 0 && this.state.password === this.state.password2 && this.state.checked) {
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
      }, (error) => {
        if (error) {
          new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
            text: error.message.slice(0,-5),
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
              open: 'noty_effects_open',
              close: 'noty_effects_close'
            }
          }).show();
        } else {
          this.props.history.push('/');
        }
      });
    } else {
      new Noty({
        type: 'warning',
        layout: 'topRight',
        theme: 'sunset',
        text: 'Please fill all fields, check the terms and make sure passwords are same.',
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
            Already have an account ? <p className='authActions' onClick={() => this.props.history.push('/login', {username: this.state.username})}>Login</p>
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
