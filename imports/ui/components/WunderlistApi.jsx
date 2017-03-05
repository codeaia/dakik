import React, { Component, constructor, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';

import { Tasks } from '../../api/tasks.js';

allTasks = null;

export default class WunderlistApi extends Component {
  constructor(props) {
    super(props);

    allTasks = this.props.task;

    this.takeToken = this.takeToken.bind(this);
    this.insertLists = this.insertLists.bind(this);
    this.example = this.example.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);

    var location = window.location.href;
    var pathanddomain = location.split('&');
    var path = pathanddomain.splice(1, pathanddomain.length-1);
    if(path[0]==undefined) {
      code="";
    } else {
      var codeSegment = path[0];
      var checkValue = codeSegment.charAt(codeSegment.length-1);
      if(checkValue=='#') {
        var code = codeSegment.substring(5,codeSegment.length-1);
      } else {
        var code = codeSegment.substring(5,codeSegment.length);
      }
    }

    if(code=="") {
      this.state = {
        disabled: false,
      }
    } else {
      this.state = {
        disabled: true,
      }
      this.takeToken();
    }
  }

  takeToken() {
    var location = window.location.href;
    var pathanddomain = location.split('&');
    var path = pathanddomain.splice(1, pathanddomain.length-1);
    var codeSegment = path[0];

    var checkValue = codeSegment.charAt(codeSegment.length-1);
    if(checkValue=='#') {
      var code = codeSegment.substring(5,codeSegment.length-1);
    } else {
      var code = codeSegment.substring(5,codeSegment.length);
    }

    Meteor.call('fetchFromService', code, function(err, respJson) {
      if(err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      }
    });

    this.handleDisabled();
  }

  insertLists() {
    const ownerId = this.props.currentUser._id;
    const checked = false;
    const taskPriority = 0;
    const totalPomos = 0;
    const taskGoal = 0;
    const newDate = new Date();
    const dueDate = new Date();
    var equal = 0;

    Meteor.call('fetchFromService2', function(err, respJson) {
      for(i=0; i<respJson.length; i++) {
        Meteor.call('fetchFromService3', respJson[i].id, function(err, respJsonTask) {
          for(x=0;x<respJsonTask.length;x++) {
            const taskName = respJsonTask[x].title;
            console.log(respJsonTask[x].title);

            if(allTasks == null) {
              Tasks.insert({
                ownerId,
                taskName,
                taskPriority,
                checked,
                totalPomos,
                taskGoal,
                newDate,
                dueDate,
                createdAt: new Date(), // current time
              });
              allTasks[allTasks.length] = allTasks[0];
              allTasks[allTasks.length-1].taskName = taskName;
              allTasks[allTasks.length-1].ownerId = ownerId;
              allTasks[allTasks.length-1].taskPriority = 0;
              allTasks[allTasks.length-1].checked = false;
              allTasks[allTasks.length-1].totalPomos = 0;
              allTasks[allTasks.length-1].taskGoal = 0;
              allTasks[allTasks.length-1].newDate = new Date();
              allTasks[allTasks.length-1].dueDate = new Date();
              allTasks[allTasks.length-1].createdAt = new Date();

              equal = equal + 1;
            } else {
              for(y=0;y<allTasks.length;y++) {
                if(respJsonTask[x].title == allTasks[y].taskName) {
                  equal = equal + 1;
                }
              }
            }

            if(equal==0) {
              Tasks.insert({
                ownerId,
                taskName,
                taskPriority,
                checked,
                totalPomos,
                taskGoal,
                newDate,
                dueDate,
                createdAt: new Date(), // current time
              });
              allTasks[allTasks.length] = allTasks[0];
              allTasks[allTasks.length-1].taskName = taskName;
              allTasks[allTasks.length-1].ownerId = ownerId;
              allTasks[allTasks.length-1].taskPriority = 0;
              allTasks[allTasks.length-1].checked = false;
              allTasks[allTasks.length-1].totalPomos = 0;
              allTasks[allTasks.length-1].taskGoal = 0;
              allTasks[allTasks.length-1].newDate = new Date();
              allTasks[allTasks.length-1].dueDate = new Date();
              allTasks[allTasks.length-1].createdAt = new Date();
            }
            equal = 0;
          }
        });
      }
    });
  }

  handleDisabled() {
    if (this.refs.myRef) {
      this.setState({disabled: !this.state.disabled});
    }
  }

  example() {
    this.handleDisabled();
    window.location.href = "https://www.wunderlist.com/oauth/authorize?client_id=e04ef6ffa3101a7ffe8e&redirect_uri=http://localhost:3000&state=RANDOM";
  }

  render() {
    return (
      <div ref="myRef">
        <FlatButton disabled={this.state.disabled} label="Connect To Wunderlist" onTouchTap={this.example}/>
        <FlatButton label="SYNC" onTouchTap={this.insertLists}/>
      </div>
    );
  }
}
