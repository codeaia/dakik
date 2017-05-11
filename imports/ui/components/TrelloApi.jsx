import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import parse from 'url-parse';
import { Button, Icon } from 'semantic-ui-react';
import Loading from './Loading.jsx';
import { Tasks } from '../../api/tasks.js';
Moment = require('moment');

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
        Meteor.call("postBoard", (error, result) => {
          //We need this useless callback for changing history
          this.props.history.push('/settings/trello');
        });

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
    var found = false;
    var allTasks = this.props.tasks;
    Meteor.call("getBoardsId", function(error, resultBoardsId) {

      for(i=0; i<resultBoardsId.length; i++) {

        Meteor.call("getInfo", resultBoardsId[i], function(error, result) {
          for(y=0; y<result.length; y++) {

            for(z=0;z<allTasks.length;z++) {
              if(result[y].name == allTasks[z].taskName && Moment(result[y].due).isSame(allTasks[z].dueDate, "day")) {
                found = true;
              }
            }

            if(!found) {
              Meteor.call('addTask', result[y].name, 0, 1, 'trello', result[y].due);
            }

            found = false;
          }
        });
      }
    });
  }

  render() {
    if (this.props.currentUser && this.props.tasks) {
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
  Meteor.subscribe('allTasks');
  var tasks = Tasks.find({}).fetch();
  return {
    currentUser: Meteor.user(),
    tasks,
  };
}, TrelloApi);
