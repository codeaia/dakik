import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import parse from 'url-parse';
import { Button, Icon } from 'semantic-ui-react';

import { Tasks } from '../../api/tasks.js';

import Loading from './Loading.jsx';

class WunderlistApi extends Component {
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
          this.props.history.push('/settings/wunderlist');
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
              1,
              "wunderlist",
              new Date(),
            );
          }
        });
      }
    });
  }

  goToWunderlist() {
    window.location.href = "https://www.wunderlist.com/oauth/authorize?client_id=bcddc2947c80dd050a3f&redirect_uri=http://localhost:3000/settings/wunderlist&state=RANDOM";
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div ref="myRef">
          <Button
            disabled={this.props.currentUser.profile.wunderlistToken !== undefined ? true : false}
            content={this.props.currentUser.profile.wunderlistToken !== undefined ? "Connected" : "Connect To Wunderlist"}
            color='teal'
            icon={<Icon link as="span" className='fa fa-cog'/>}
            labelPosition='left'
            className="animated fadeIn"
            onClick={this.goToWunderlist}
          />
          <Button
            content='Sync'
            disabled={this.props.currentUser.profile.wunderlistToken !== undefined ? false : true}
            color='green'
            icon={<Icon link as="span" className='fa fa-exchange'/>}
            labelPosition='left'
            className="animated fadeIn"
            onClick={this.insertLists}
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

export default WunderlistApiContainer = createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, WunderlistApi);
