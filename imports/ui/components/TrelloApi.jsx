import React, { Component, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import WunderlistApi from './WunderlistApi.jsx';
import { Tasks } from '../../api/tasks.js';
parse = require('url-parse');

class TrelloApi extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.getInfo = this.getInfo.bind(this);

    if(Meteor.user() !== undefined) {
      this.state = {
        disabled: true,
        value: "Connected"
      }
    } else {
      this.state = {
        disabled: false,
        value: "Connect To Trello"
      }
    }

    url = parse(window.location.href, true).query;
    if(location.search !== "" && !_.isEmpty(url.oauth_token)) {
      Meteor.call("takeTrelloOauthToken", url, (error, result) => {
        var temp = Meteor.user().profile;
        temp.accessToken = result[0];
        temp.accessTokenSecret = result[1];
        Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
        this.props.history.push('/settings');
      });
    }
  }

  login() {
    Meteor.call("takeTrelloToken", function(error, result) {
      var temp = Meteor.user().profile;
      temp.token = result[0];
      temp.tokenSecret = result[1];
      Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
      window.location.href="https://trello.com/1/OAuthAuthorizeToken?oauth_token=" + result[0] + "&name=Dakik&expiration=never&scope=read,write";
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentUser.profile.accessToken !== undefined) {
      this.setState({
        disabled: true,
        value: "Connected"
      });
    }
  }

  getInfo() {
    Meteor.call("getBoardsId", function(error, result) {
      for(i=0; i<result.length; i++) {
        Meteor.call("getInfo", result[i], function(error, result) {
          for(i=0; i<result.length; i++) {
            console.log(result[i].name);
            Meteor.call('addTask', result[i].name, 0, 1, 'trello', new Date());
          }
        });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider ref="myRef">
        <div>
          <FlatButton disabled={this.state.disabled} className="ConnectToTrello" label={this.state.value} onTouchTap={this.login}/>
          <FlatButton className="SYNC" label="SYNC" onTouchTap={this.getInfo}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TrelloApiContainer = createContainer(() => {

  Meteor.subscribe('tasks');
  var currentUser = Meteor.user();

  return {
    currentUser,
  };
}, TrelloApi);
