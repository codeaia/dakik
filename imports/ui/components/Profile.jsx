import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    Trello.authorize({
      interactive:false,
    });

    var isLoggedIn = Trello.authorized();

    if(isLoggedIn) {
      this.state = {
        open: false,
        disabled: true,
        disabled2: false
      }
    } else {
      this.state = {
        open: false,
        disabled: false,
        disabled2: true
      }
    }

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

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={ this.props.currentUser ? this.props.currentUser.username : 'error'}
            subtitle= { this.props.currentUser ? this.props.currentUser.emails[0].address : 'error'}
            avatar="assets/jsa-128.jpg"
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
      </MuiThemeProvider>
    );
  }
}
