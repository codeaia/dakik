import React, { Component, constructor } from 'react';

import { Tasks } from '../../api/tasks.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
parse = require('url-parse');

export default class WunderlistApi extends Component {
  constructor(props) {
    super(props);

    this.insertLists = this.insertLists.bind(this);
    this.goToWunderlist = this.goToWunderlist.bind(this);

    url = parse(window.location.href, true).query;
    if(location.search !== ""  && !_.isEmpty(url.code)) {
      Meteor.call('fetchFromService', url.code, (err, respJson) => {
        if(err) {
          window.alert("Error: " + err.reason);
          console.log("error occured on receiving data on server. ", err );
        } else {
          this.props.history.push('/settings');
        }
      });
    }
  }

  insertLists() {
    var taskCount = 0;
    if (Meteor.user().profile.taskCount) {
      taskCount = Meteor.user().profile.taskCount;
    }

    var wunderlistTasksCount = 0;
    if (Meteor.user().profile.wunderlistTasksCount) {
      wunderlistTasksCount = Meteor.user().profile.wunderlistTasksCount;
    }

    Meteor.call('fetchFromService2', function(err, respJson) {
      for(i=0; i<respJson.length; i++) {
        Meteor.call('fetchFromService3', respJson[i].id, function(err, respJsonTask) {
          for(x=0;x<respJsonTask.length;x++) {
            Meteor.call(
              'addTask',
              respJsonTask[x].title,
              0,
              0,
              "wunderlist",
              null,
            );
          }
        });
      }
    });
  }

  goToWunderlist() {
    window.location.href = "https://www.wunderlist.com/oauth/authorize?client_id=bcddc2947c80dd050a3f&redirect_uri=http://localhost:3000/settings&state=RANDOM";
  }

  render() {
    return (
      <MuiThemeProvider ref="myRef">
        <div>
          <FlatButton disabled={Meteor.user().profile.wunderlistToken !== undefined ? true : false} label={Meteor.user().profile.wunderlistToken !== undefined ? "Connected" : "Connect To Wunderlist"} onTouchTap={this.goToWunderlist}/>
          <FlatButton label="SYNC" onTouchTap={this.insertLists}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
