import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import parse from 'url-parse';
import { Button, Icon } from 'semantic-ui-react';
import Loading from './Loading.jsx';

import WunderlistApi from './WunderlistApi.jsx';
import { Tasks } from '../../api/tasks.js';

class TrelloApi extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.getInfo = this.getInfo.bind(this);

    url = parse(window.location.href, true).query;
    if(location.search !== "" && !_.isEmpty(url.oauth_token)) {
      Meteor.call("takeTrelloOauthToken", url, (error, result) => {
        Meteor.users.update(Meteor.userId(),{$set: {
          "profile.accessToken": result[0],
          "profile.accessTokenSecret": result[1]
        }});
        this.props.history.push('/settings/trello');
      });
    }
  }

  login() {
    Meteor.call("takeTrelloToken", function(error, result) {
      Meteor.users.update(Meteor.userId(),{$set: {
        "profile.token": result[0],
        "profile.tokenSecret": result[1]
      }});
      window.location.href="https://trello.com/1/OAuthAuthorizeToken?oauth_token=" + result[0] + "&name=Dakik&expiration=never&scope=read,write";
    });
  }

  getInfo() {
    Meteor.call("getBoardsId", function(error, result) {
      for(i=0; i<result.length; i++) {
        Meteor.call("getInfo", result[i], function(error, result) {
          for(i=0; i<result.length; i++) {
            Meteor.call('addTask', result[i].name, 0, 1, 'trello', new Date());
          }
        });
      }
    });
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div ref="myRef">
          <Button
            disabled={this.props.currentUser.profile.accessToken ? true : false}
            content={this.props.currentUser.profile.accessToken ? "Connected" : "Connect To Trello"}
            color='teal'
            icon={<Icon link as="span" className='fa fa-sign-in'/>}
            labelPosition='left'
            className="animated fadeIn"
            onClick={this.login}
          />
          <Button
            content='Sync'
            disabled={this.props.currentUser.profile.accessToken ? false : true}
            color='green'
            icon={<Icon link as="span" className='fa fa-exchange'/>}
            labelPosition='left'
            className="animated fadeIn"
            onClick={this.getInfo}
          />
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
}

export default TrelloApiContainer = createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, TrelloApi);
