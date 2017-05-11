import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import parse from 'url-parse';
import { Button, Icon } from 'semantic-ui-react';
import Loading from './Loading.jsx';
import { Tasks } from '../../api/tasks.js';
Moment = require('moment');
//ikinci denemede Exception in delivering result of invoking 'fetchFromService3': TypeError: Moment(...).isSame(...).format is not a function

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
    var found = false;
    var allTasks = this.props.tasks;
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

            for(z=0;z<allTasks.length;z++) {
              if(respJsonTask[x].title == allTasks[z].taskName && Moment(respJsonTask[x].due_date).isSame(allTasks[z].dueDate, "day")) {
                found = true;
              }
            }

            if(!found) {
              Meteor.call('addTask', respJsonTask[x].title, 0, 1, "wunderlist", respJsonTask[x].due_date);
            }

            found = false;
          }
        });
      }
    });
  }

  goToWunderlist() {
    window.location.href = "https://www.wunderlist.com/oauth/authorize?client_id=bcddc2947c80dd050a3f&redirect_uri=http://localhost:3000/settings/wunderlist&state=RANDOM";
  }

  render() {
    if (this.props.currentUser && this.props.tasks) {
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
  Meteor.subscribe('allTasks');
  var tasks = Tasks.find({}).fetch();
  return {
    currentUser: Meteor.user(),
    tasks,
  };
}, WunderlistApi);
