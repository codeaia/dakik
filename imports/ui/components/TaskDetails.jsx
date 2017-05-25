import React, { Component } from 'react';
import { Tasks } from '../../api/tasks.js';
import { Pomos } from '../../api/pomos.js';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from './Loading.jsx';
import Nav from './Nav.jsx';

var moment = require('moment');

import { ListItem } from 'material-ui/List';

import { Button, Header, Icon, Modal, List, Menu } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.startPomo = this.startPomo.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.addToTrello = this.addToTrello.bind(this);
    this.addToWunderlist = this.addToWunderlist.bind(this);
  }


 startPomo(){
   if (!Meteor.user().profile.currentTaskId) {
     if (!this.props.location.state.task.checked) {
       Meteor.users.update(Meteor.userId(),{$set: {
         "profile.playing": true,
         "profile.timerDue": ((new Date()).valueOf() / 1000) + 1500,
         "profile.currentTaskId": this.props.location.state.task._id,
       }});
        this.props.history.push('/');
     }
   }
 }

 deleteTask(){
    if(Session.get('skip') > 0 && this.props.length === 1) {
      Session.set('skip', Session.get('skip') - 10);
    }
   var task = Tasks.findOne(this.props.location.state.task._id);
   Meteor.subscribe('pomos', this.props.location.state.task._id);
   var pomos = Pomos.find(this.props.location.state.task._id).fetch();
   pomos.map((pomo) => {
     if (task.checked) {
       Meteor.call('updateDate', pomo.finishDate,  0 - task.pomoCount, -1);
     } else {
       Meteor.call('updateDate', pomo.finishDate,  0 - task.pomoCount, 0);
     }
   });
   Meteor.call('deleteTask', this.props.location.state.task._id);
   this.props.history.push('/');
 }

 addToTrello() {
   Meteor.call("postInfo", this.props.location.state.task.taskName, this.props.location.state.task.dueDate);
 }

 addToWunderlist() {
   Meteor.call("postSomething", this.props.location.state.task.taskName, this.props.location.state.task.dueDate);
 }

  render(){
    if (this.props.user) {
      return(
        <div>
          <Nav history={this.props.history} location={this.props.location} />
          <div className="taskDetails">
            <div className="taskDetailsContent">
              <div className="taskName">
                <p>{this.props.location.state.task.taskName}</p>
              </div>
              <div className = "integrations">
                    <Button
                      size = "mini"
                      icon={<Icon as='span' className='fa fa-plus'/>}
                      content="Trello"
                      labelPosition='left'
                      onClick={() => this.addToTrello()}
                      />
                    <Button
                      size = "mini"
                      icon={<Icon as='span' className='fa fa-plus'/>}
                      content="Wunderlist"
                      labelPosition='left'
                      onClick={() => this.addToWunderlist()}
                      />
              </div>
              <div className="priority each">
                <p className="target">Priority:</p>
                <p className="value">{this.props.location.state.task.taskPriority}</p>
              </div>
              <div className="pomoTime each">
                <p className="target">Total Pomos:</p>
                <p className="value">{this.props.location.state.task.pomoCount}</p>
              </div>
              <div className="estPomos each">
                <p className="target">Pomo Goal:</p>
                <p className="value">{this.props.location.state.task.pomoGoal}</p>
              </div>
              <div className="due each">
                <p className="target">Due Date:</p>
                <p className="value">{moment(this.props.location.state.task.dueDate).format("MMM Do YY")}</p>
              </div>
              <div className="moreInfo each">
                <p className="target">More...</p>
                <ReactMarkdown containerTagName="div" className="value" source={this.props.location.state.task.details ? this.props.location.state.task.details : 'No details provided.'}></ReactMarkdown>
              </div>
              <div className="taskDetailsActions">
                <Button
                  icon={<Icon as='span' className='fa fa-trash'/>}
                  className={this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? 'hide' : 'remove'}
                  disabled={this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? true : false}
                  onClick={() => this.deleteTask()}
                />
                <Button
                  icon={<Icon as='span' className='fa fa-check'/>}
                  className={this.props.location.state.task._id === this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? 'hide' : 'finish'}
                  disabled={this.props.location.state.task._id === this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? true : false}
                  onClick={() => this.finishTask()}
                />
                <Button
                  icon={<Icon as='span' className='fa fa-pencil-square-o'/>}
                  className={this.props.location.state.task._id === this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? 'hide' : 'edit'}
                  disabled={this.props.location.state.task._id === this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? true : false}
                  onClick={() => this.props.history.push('taskEdit', {task: this.props.location.state.task})}
                />
                <Button
                  icon={<Icon as='span' className='fa fa-play' />}
                  className={this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? 'hide' : 'start'}
                  disabled={this.props.user.profile.currentTaskId || this.props.location.state.task.checked ? true : false}
                  onClick={() => this.startPomo()}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <Loading/>
      );
    }
  }
}

export default TaskDetailsContainer = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, TaskDetails);
