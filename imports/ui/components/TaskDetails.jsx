import React, { Component } from 'react';
import { Tasks } from '../../api/tasks.js';
import { Pomos } from '../../api/pomos.js';

import Loading from './Loading.jsx';
import Nav from './Nav.jsx';

var moment = require('moment');

import { ListItem } from 'material-ui/List';

import { Button, Header, Icon, Modal, List, Menu } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.startPomo = this.startPomo.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }


 startPomo(){
   if (!Meteor.user().profile.playing) {
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

  render() {
    return (
    <div >
        <Nav history={this.props.history} location={this.props.location} />
          <div className = "taskDetails">
            <div className = "taskDetailsContent">
              <div className="taskName">

                <p>{this.props.location.state.task.taskName}</p>

              </div>
              <div className="priority each">
                <p className="target">Priority:</p>
                <p className="value">{this.props.location.state.task.taskPriority}</p>
              </div>
              <div className="pomoTime each">
                <p className="target">Pomotime:</p>
                <p className="value">{this.props.location.state.task.pomoCount}</p>
              </div>
              <div className="estPomos each">
                <p className="target">Estimated Pomos:</p>
                <p className="value">{this.props.location.state.task.pomoGoal}</p>
              </div>
              <div className="due each">
                <p className="target">Due Date:</p>
                <p className="value">{moment(this.props.location.state.task.dueDate).format("MMM Do YY")}</p>
              </div>
              <div className="moreInfo each">
                <p className="target">More...</p>
                <ReactMarkdown containerTagName="div" className="value" source = {this.props.location.state.task.moreInfo}></ReactMarkdown>
              </div>

        <div className = "taskDetailsActions">
            <Button
                as = "Label"
                icon={<Icon as='span' className='fa fa-trash'/>}
                negative
                disabled={Meteor.user().profile.playing || Meteor.user().profile.timerDue !== null ? true : false}
                onClick={this.deleteTask}
            />
            <Button
                as = "Label"
                icon={<Icon as='span' className='fa fa-pencil-square-o'/>}
                onClick={() => this.props.history.push('taskEdit', {task: this.props.location.state.task})}
            />
            <Button
                as = "Label"
                icon={<Icon as='span' className='fa fa-play' />}
                positive
                onClick={this.startPomo}
                disabled={Meteor.user().profile.playing || this.props.location.state.task.checked || Meteor.user().profile.timerDue !== null ? true : false}
            />
        </div>

            </div>
          </div>
    </div>

    );
  }
}
