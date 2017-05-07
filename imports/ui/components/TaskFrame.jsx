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
    if (!Meteor.user().profile.playing) {
      if (!this.props.task.checked) {
        Meteor.users.update(Meteor.userId(),{$set: {
          "profile.playing": true,
          "profile.timerDue": ((new Date()).valueOf() / 1000) + 1500,
          "profile.currentTaskId": this.props.task._id,
        }});
      }
    }
  }

  deleteTask(){
    if(Session.get('skip') > 0 && this.props.length === 1) {
      Session.set('skip', Session.get('skip') - 5);
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
        <div className="taskListItem" onClick={() => this.props.history.push('/taskDetails', {task: this.props.task})}>
          <div className="taskName">
            {this.props.task.taskName}
          </div>
          <Dropdown icon={<Icon as='span' className='fa fa-ellipsis-v'/>} floating button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  icon={<Icon as='span' className='fa fa-trash'/>}
                  negative
                  content="Delete"
                  labelPosition='left'
                  disabled={Meteor.user().profile.playing || Meteor.user().profile.timerDue !== null ? true : false}
                  onClick={this.deleteTask}
                />
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  icon={<Icon as='span' className='fa fa-pencil-square-o'/>}
                  content="Edit"
                  labelPosition='left'
                  onClick={() => this.props.history.push('taskEdit', {task: this.props.task})}
                />
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  icon={<Icon as='span' className='fa fa-play' />}
                  positive
                  content="Start"
                  labelPosition='left'
                  onClick={this.startPomo}
                  disabled={Meteor.user().profile.playing || this.props.task.checked || Meteor.user().profile.timerDue !== null ? true : false}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    )
  }
}
