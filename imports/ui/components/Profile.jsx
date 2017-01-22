import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

class Profile extends Component {
  constructor(props) {
    super(props);

    Trello.authorize({
      interactive:false,
    });

    var isLoggedIn = Trello.authorized();

    if(isLoggedIn) {
      this.state = {
        open: false,
        username: this.props.currentUser.username,
        email: this.props.currentUser.emails[0].address,
        password: '',
        disabled: true,
        disabled2: false
      }
    } else {
      this.state = {
        open: false,
        username: this.props.username,
        email: this.props.currentUser.emails[0].address,
        password: '',
        disabled: false,
        disabled2: true
      }
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.applyProfileUpdate = this.applyProfileUpdate.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.connectToTrello = this.connectToTrello.bind(this);
    this.onAuthorize = this.onAuthorize.bind(this);
    this.exitFromTrello = this.exitFromTrello.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleDisabled2 = this.handleDisabled2.bind(this);
  }

  connectToTrello(){
    Trello.authorize({
      name: "PROJECT",
      type: "popup",
      persist: false,
      success: this.onAuthorize
    })
  }

  updateLogin() {
    var isLoggedIn = Trello.authorized();
    $(".exit").toggle(isLoggedIn);
    $(".connect").toggle(!isLoggedIn);
  }

  exitFromTrello() {
    Trello.deauthorize();
    this.handleDisabled2();
    this.handleDisabled();
  }

  onAuthorize() {
    this.handleDisabled();
    this.handleDisabled2();
    console.log('OK');
  }

  handleDisabled() {
    this.setState({disabled: !this.state.disabled});
  }
  handleDisabled2() {
    this.setState({disabled2: !this.state.disabled2});
  }

  updatePassword(event, value){
    this.setState({
      password: value
    });
  }

  updateUsername(event, value){
    this.setState({
      username: value
    });
  }

  updateEmail(event, value){
    this.setState({
      email: value
    });
  }

  applyProfileUpdate(){
    Bert.alert({
      type: 'danger',
      style: 'growl-top-right',
      message: 'Disabled for now!',
      icon: 'fa-sign-in'
    });
  }

  handleOpenDialog(){
    this.setState({open: true});
  }

  handleCloseDialog(){
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.applyProfileUpdate}
      />,
    ];

    return (
      <MuiThemeProvider>
        <div>
          <Card>
            <CardHeader
              className="drawerAnim1"
              title={ this.props.currentUser ? this.props.currentUser.username : 'error'}
              subtitle= { this.props.currentUser ? this.props.currentUser.emails[0].address : 'error'}
              avatar="assets/jsa-128.jpg"
              onTouchTap={this.handleOpenDialog}
              />
            <CardTitle title="İstatistiklerin"/>
            <CardText>
              Friends: 4<br/>
              Task Record: 2<br/>
              Tag Record: 3<br/>
            </CardText>
            <CardActions>
              <FlatButton disabled={this.state.disabled} className="connect" label="Connect to Trello" onTouchTap={this.connectToTrello}/>
              <FlatButton disabled={this.state.disabled2} className="exit" label="Disconnect from Trello" onTouchTap={this.exitFromTrello}/>
            </CardActions>
          </Card>
          <Dialog
            title="Change your Profile"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleCloseDialog}
          >
            <Card>
              <CardText>
                <Flexbox flexDirection="column">
                  <TextField
                    name={this.state.username}
                    type="text"
                    onChange = {this.updateUsername}
                    value={this.state.username}
                    floatingLabelText = "Username"
                    />
                  <TextField
                    name={this.state.email}
                    type="text"
                    onChange = {this.updateEmail}
                    value={this.state.email}
                    floatingLabelText = "E Mail"
                    />
                  <TextField
                    name={this.state.password}
                    type="password"
                    onChange = {this.updatePassword}
                    value={this.state.password}
                    floatingLabelText = "Password"
                    />
                </Flexbox>
              </CardText>
            </Card>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Profile);
