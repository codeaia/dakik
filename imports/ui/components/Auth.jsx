import React, {Component, constructor, State} from 'react';
import { Session } from 'meteor/session'

import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbar: Session.get("snackbar"),
      message: Session.get("snackbarMessage"),
      signinUsername: '',
      signinPassword: '',
      signupUsername: '',
      signupEmail: '',
      signupPassword: '',
      signupPassword2: ''
    };

    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.updateSnackbarText = this.updateSnackbarText.bind(this);

    this.updateSigninUsername = this.updateSigninUsername.bind(this);
    this.updateSigninPassword = this.updateSigninPassword.bind(this);

    this.updateSignupUsername = this.updateSignupUsername.bind(this);
    this.updateSignupEmail = this.updateSignupEmail.bind(this);
    this.updateSignupPassword = this.updateSignupPassword.bind(this);
    this.updateSignupPassword2 = this.updateSignupPassword2.bind(this);

    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleFPass = this.handleFPass.bind(this);

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  updateSnackbarText(value){
    this.setState({
      message: value
    });
  }

  openSnackbar(){
    this.setState({
      snackbar: true,
    });
  }

  closeSnackbar(){
    this.setState({
      snackbar: false,
    });
  }

  updateSigninUsername(event, value){
    this.setState({
      signinUsername: value
    });
  }

  updateSigninPassword(event, value){
    this.setState({
      signinPassword: value
    });
  }

  updateSignupUsername(event, value){
    this.setState({
      signupUsername: value
    });
  }

  updateSignupEmail(event, value){
    this.setState({
      signupEmail: value
    });
  }

  updateSignupPassword(event, value){
    this.setState({
      signupPassword: value
    });
  }

  updateSignupPassword2(event, value){
    this.setState({
      signupPassword2: value
    });
  }

  validateEmail(email) {
    var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email);
  }

  validatePassword(password){
    var regexPassword = /[a-zA-Z0-9]+$/;
    return regexPassword.test(password);
  }

  handleSignin(){
    if (this.state.signinUsername.toString().length == 0) {
      this.updateSnackbarText('Please enter a username!');
      this.openSnackbar();
      return false;
    } else if (this.state.signinPassword.toString().length == 0) {
      this.updateSnackbarText('Please enter a password!');
      this.openSnackbar();
      return false;
    } else {
      var usernameLength = this.state.signinUsername.toString().length;
      var passwordLength = this.state.signinPassword.toString().length;
      var validPassword = this.validatePassword(this.state.signinPassword);

      if (usernameLength < 8 || usernameLength > 16) {
        this.updateSnackbarText('Make sure your username length is between 8-16!');
        this.openSnackbar();
      } else {
        if (passwordLength < 8 || passwordLength > 16) {
          this.updateSnackbarText('Make sure your password length is between 8-16!');
          this.openSnackbar();
        }else {
          if (validPassword) {
            Meteor.loginWithPassword(this.state.signinUsername, this.state.signinPassword, (error, data) => {
              if(error) {
                this.updateSnackbarText('Sign In Failed!');
                this.openSnackbar();
              } else {
                FlowRouter.go('/');
              }
            });
          }else {
            this.updateSnackbarText('Password should only contain alphanumeric characters');
            this.openSnackbar();
          }
        }
      }
    }
  }

  handleFPass(){
    this.updateSnackbarText('Not yet implemented, please open another account!');
    this.openSnackbar();
  }

  handleSignup(){
    if (this.state.signupUsername.toString().length == 0) {
      this.updateSnackbarText('Please enter a username!');
      this.openSnackbar();
      return false;
    } else if(this.state.signupEmail.toString().length == 0) {
      this.updateSnackbarText('Please enter an e-mail!');
      this.openSnackbar();
      return false;
    } else if (this.state.signupPassword.toString().length == 0) {
      this.updateSnackbarText('Please enter a password!');
      this.openSnackbar();
      return false;
    } else {
      var usernameLength = this.state.signupUsername.toString().length;
      var validEmail = this.validateEmail(this.state.signupEmail);
      var passwordLength = this.state.signupPassword.toString().length;
      var validPassword = this.validatePassword(this.state.signupPassword);

      if (usernameLength < 8 || usernameLength > 16) {
        this.updateSnackbarText('Make sure your username length is between 8-16!');
        this.openSnackbar();
      } else {
        if (validEmail) {
          if (passwordLength < 8 || passwordLength > 16) {
            this.updateSnackbarText('Make sure your password length is between 8-16!');
            this.openSnackbar();
          } else {
            if (validPassword) {
              if (this.state.signupPassword == this.state.signupPassword2) {
                Accounts.createUser({
                  username: this.state.signupUsername,
                  email: this.state.signupEmail,
                  password: this.state.signupPassword,
                  profile: {
                    hideCompleted: false,
                    playing: false,
                    elapsedTime: 1,
                    updateTime: 0
                  }
                }, (error, data) => {
                  if(error) {
                    this.updateSnackbarText('Sign Up Failed!');
                    this.openSnackbar();
                  } else {
                    FlowRouter.redirect('/');
                  }
                });
              }else {
                this.updateSnackbarText('Password do not match!');
                this.openSnackbar();
              }
            } else {
              this.updateSnackbarText('Password should only contain alphanumeric characters!');
              this.openSnackbar();
            }
          }
        } else {
          this.updateSnackbarText('Please enter a valid email!');
          this.openSnackbar();
        }
      }
    }
};

render() {
  return (
    <MuiThemeProvider>
      <div className="auth">
        <Tabs>
          <Tab label="Sign In">
            <Card>
              <CardText>
                <Flexbox flexDirection="column">
                  <TextField
                    name="signinUsername"
                    type="text"
                    onChange = {this.updateSigninUsername}
                    floatingLabelText = "Username"
                  />
                  <TextField
                    name="signinPassword"
                    type="password"
                    onChange = {this.updateSigninPassword}
                    floatingLabelText = "Password"
                    className = "textfield" />
                  </Flexbox>
                </CardText>
                <CardActions>
                  <RaisedButton label="Forgot Password ?" onClick={this.handleFPass} backgroundColor = "#FFFFFF" labelColor="#004d40"/>
                  <RaisedButton label="Sign In" onClick={this.handleSignin} backgroundColor = "#004D40" labelColor="#FFFFFF"/>
                </CardActions>
              </Card>
            </Tab>
            <Tab label="Sign Up" >
              <Card>
                <CardText>
                  <Flexbox className="textfields" flexDirection="column">
                    <TextField
                      name="signupUsername"
                      type="text"
                      onChange = {this.updateSignupUsername}
                      floatingLabelText = "Username"
                      className = "textfield"
                    />
                    <TextField
                      name="signupEmail"
                      type="text"
                      onChange = {this.updateSignupEmail}
                      floatingLabelText = "E-mail"
                      className = "textfield"
                    />
                    <TextField
                      name="signupPassword"
                      type="password"
                      onChange = {this.updateSignupPassword}
                      floatingLabelText = "Password"
                      className = "textfield"
                    />
                    <TextField
                      name="signupPassword2"
                      type="password"
                      onChange = {this.updateSignupPassword2}
                      floatingLabelText = "Password Again"
                      className = "textfield"
                    />
                  </Flexbox>
                </CardText>
                <CardActions>
                  <RaisedButton label="Sign Up" onClick={this.handleSignup} backgroundColor = "#004D40" labelColor="#FFFFFF" fullWidth={true}/>
                </CardActions>
              </Card>
            </Tab>
          </Tabs>
          <Snackbar
            open={this.state.snackbar}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.closeSnackbar}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
