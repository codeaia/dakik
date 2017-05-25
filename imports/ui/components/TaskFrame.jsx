import React, { Component } from 'react';

import { Tasks } from '../../api/tasks.js';
import { Pomos } from '../../api/pomos.js';

import { Button, Icon, Dropdown } from 'semantic-ui-react';

export default class TaskFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: this.props.task.taskName,
      taskPriority: this.props.task.taskPriority,
      pomoGoal: this.props.task.pomoGoal,
      dueDate: this.props.task.dueDate,
    }

    this.startPomo = this.startPomo.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  startPomo(){
    if (!Meteor.user().profile.currentTaskId) {
      if (!this.props.task.checked) {
        Meteor.users.update(Meteor.userId(),{$set: {
          "profile.timerDue": ((new Date()).valueOf() / 1000) + 1500,
          "profile.currentTaskId": this.props.task._id,
        }});
      }
    }
  }

  finishTask(){
    Meteor.call('killTask', this.props.task._id);
  }

  deleteTask(){
    if(Session.get('skip') > 0 && this.props.length === 1) {
      Session.set('skip', Session.get('skip') - 10);
    }
    var task = Tasks.findOne(this.props.task._id);
    Meteor.subscribe('pomos', task._id);
    var pomos = Pomos.find(this.props.task._id).fetch();
    pomos.map((pomo) => {
      if (task.checked) {
        Meteor.call('updateDate', pomo.finishDate,  0 - task.pomoCount, -1);
      } else {
        Meteor.call('updateDate', pomo.finishDate,  0 - task.pomoCount, 0);
      }
    });
    Meteor.call('deleteTask', this.props.task._id);
  }

  render() {
    return(
      <div className="taskFrame">
        <progress className = {((this.props.task.pomoCount / this.props.task.pomoGoal)*100+1)>=101 ? "taskProgress checked" : "taskProgress" } max = "101" value = {(this.props.task.pomoCount / this.props.task.pomoGoal)*100+1}></progress>
        <div className={this.props.task.checked ? "checked taskListItem" : "taskListItem"} onClick={() => this.props.history.push('/taskDetails', {task: this.props.task})}>
          <div className="taskName">{this.props.task.taskName}</div>
          <Dropdown icon={<Icon as='span' className='fa fa-ellipsis-v'/>} button className='taskActions icon'>
            <Dropdown.Menu>
              <Dropdown.Item
                icon={<Icon as='span' className='fa fa-trash'/>}
                content="Delete"
                className={this.props.user.profile.currentTaskId || this.props.task.checked ? 'hide' : 'remove'}
                disabled={this.props.user.profile.currentTaskId || this.props.task.checked ? true : false}
                onClick={() => this.deleteTask()}
              />
              <Dropdown.Item
                icon={<Icon as='span' className='fa fa-check'/>}
                content="Complete"
                className={this.props.task._id === this.props.user.profile.currentTaskId || this.props.task.checked ? 'hide' : 'finish'}
                disabled={this.props.task._id === this.props.user.profile.currentTaskId || this.props.task.checked ? true : false}
                onClick={() => this.finishTask()}
              />
              <Dropdown.Item
                icon={<Icon as='span' className='fa fa-pencil-square-o'/>}
                content="Edit"
                className={this.props.task._id === this.props.user.profile.currentTaskId || this.props.task.checked ? 'hide' : 'edit'}
                disabled={this.props.task._id === this.props.user.profile.currentTaskId || this.props.task.checked ? true : false}
                onClick={() => this.props.history.push('taskEdit', {task: this.props.task})}
              />
              <Dropdown.Item
                icon={<Icon as='span' className='fa fa-play' />}
                className={this.props.user.profile.currentTaskId || this.props.task.checked ? 'hide' : 'start'}
                content="Start"
                disabled={this.props.user.profile.currentTaskId || this.props.task.checked ? true : false}
                onClick={() => this.startPomo()}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    )
  }
}
