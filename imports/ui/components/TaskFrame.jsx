import React, { Component } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import Flexbox from 'flexbox-react';
var moment = require('moment');

import { Tasks } from '../../api/tasks.js';
import { Pomos } from '../../api/pomos.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default class TaskFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'error',
      checked: false,
      open: false,
      open2: false,

      taskName: this.props.task.taskName,
      taskPriority: this.props.task.taskPriority,
      pomoGoal: this.props.task.pomoGoal,
      dueDate: this.props.task.dueDate,
    }

    this.openTaskDetails = this.openTaskDetails.bind(this);
    this.openTaskEdit = this.openTaskEdit.bind(this);
    this.closeTaskDetails = this.closeTaskDetails.bind(this);
    this.closeTaskEdit = this.closeTaskEdit.bind(this);
    this.editNewDetails = this.editNewDetails.bind(this);

    this.deleteTask = this.deleteTask.bind(this);
    this.startPomo = this.startPomo.bind(this);

    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.updatePomoGoal = this.updatePomoGoal.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);
  }

  componentDidMount(){
    this.setState({
      checked: this.props.task.checked,
    });
  }

  componentWillReceiveProps(nextProps){
    if (this.props.task.checked !== nextProps.task.checked) {
      this.setState({
        checked: nextProps.task.checked,
      });
    }
  }

  updateTaskName(event, value){
    this.setState({
      taskName: value
    });
  }

  updatePriority(event, value){
    this.setState({
      taskPriority: value
    });
  }

  updatePomoGoal(event, value) {
    this.setState({
      pomoGoal: value
    });
  }

  updateDueDate(event, date) {
    this.setState({
      dueDate: date,
    });
  }

  startPomo(){
    if (!Meteor.user().profile.playing) {
      if (!this.props.task.checked) {
        Meteor.users.update(Meteor.userId(),{$set: {
          "profile.playing": true,
          "profile.timerDue": ((new Date()).valueOf() / 1000) + 1500,
          "profile.currentTaskId": this.props.task._id,
        }});
        this.closeTaskDetails();
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
    this.setState({
      open: false,
      open2: false
    });
  }

  editNewDetails() {
    Meteor.call('editTask', this.props.task._id, this.state.taskName, this.state.taskPriority, this.state.pomoGoal, this.state.dueDate);
    this.closeTaskEdit();
  }

  openTaskEdit() {
    this.setState({
      open: true,
      open2: true,
      taskName: this.props.task.taskName,
      taskPriority: this.props.task.taskPriority,
      pomoGoal: this.props.task.pomoGoal,
      dueDate: this.props.task.dueDate,
    });
  }

  closeTaskEdit() {
    this.setState({
      open: true,
      open2: false
    });
  }

  openTaskDetails(){
    this.setState({
      open: true,
      open2: false
    });
  }

  closeTaskDetails() {
    this.setState({
      open: false,
      open2:false
    });
  }

  render() {
    const actions2 = [
        <IconButton
            label="CANCEL"
            iconClassName="cancel fa fa-times-circle"
            onTouchTap={this.closeTaskEdit}
        />,
        <IconButton
            label="SAVE"
            iconClassName="ok fa fa-check"
            onTouchTap={this.editNewDetails}
        />,
    ];


    const actions = [
      <IconButton
        iconClassName="delete fa fa-trash-o"
        tooltip="DELETE"
        onClick={this.deleteTask}
        disabled={Meteor.user().profile.playing || Meteor.user().profile.elapsedTime > 0 ? true : false}
      />,
      <Modal
        className = "taskEdit"
        size="small"
        dimmer={true}
        open={this.state.open2}
        onOpen={this.openTaskEdit}
        onClose={this.closeTaskEdit}
      >
        <Modal.Header className = "taskEditTitle">Edit Task</Modal.Header>
        <Modal.Content className = "taskEditContent">
            <TextField
              id="edit-task-name"
              value={this.state.taskName}
              type="text" onChange={this.updateTaskName}
              floatingLabelText="Task Name"
              className = "taskName each"
            />

            <SelectField
              floatingLabelText="Priority"
              value={this.state.taskPriority}
              onChange={this.updatePriority}
              className = "each">
              <MenuItem value={0} primaryText="0 (No Priority)"/>
              <MenuItem value={1} primaryText="1 (Urgent)"/>
              <MenuItem value={2} primaryText="2 (Today)"/>
              <MenuItem value={3} primaryText="3 (This Week)"/>
              <MenuItem value={4} primaryText="4 (This Month)"/>
              <MenuItem value={5} primaryText="5 (Any Time)"/>
            </SelectField>

            <SelectField
              floatingLabelText="Task Goal"
              value={this.state.pomoGoal}
              onChange={this.updatePomoGoal}
              className="each"
            >
              <MenuItem value={1} primaryText="1"/>
              <MenuItem value={2} primaryText="2"/>
              <MenuItem value={3} primaryText="3"/>
              <MenuItem value={4} primaryText="4"/>
              <MenuItem value={5} primaryText="5"/>
              <MenuItem value={6} primaryText="6"/>
              <MenuItem value={7} primaryText="7"/>
              <MenuItem value={8} primaryText="8"/>
              <MenuItem value={9} primaryText="9"/>
              <MenuItem value={10} primaryText="10"/>
            </SelectField>
            <DatePicker
              floatingLabelText="Due Date"
              value={this.state.dueDate}
              onChange={this.updateDueDate}
              className = "each"
            />
        </Modal.Content>
        <div className = "taskEditActions">{actions2}</div>
      </Modal>,
      <IconButton
          iconClassName="edit fa fa-pencil-square-o"
          tooltip="EDIT"
          onClick={this.openTaskEdit}
      />,
      <IconButton
          iconClassName="start fa fa-play"
          tooltip="START"
          onClick={this.startPomo}
          className = "actionButton start"
          disabled={Meteor.user().profile.playing || this.props.task.checked || Meteor.user().profile.elapsedTime > 0 ? true : false}
      />
    ];


    return(
        <div className="taskFrame">
            <progress className = {((this.props.task.pomoCount / this.props.task.pomoGoal)*100+1)>=101  ?"taskProgress checked": "taskProgress" } max = "101" value = {(this.props.task.pomoCount / this.props.task.pomoGoal)*100+1}></progress>
            <ListItem
                className={this.props.task.checked ? "checked taskListItem" : "taskListItem"}
                primaryText={Meteor.user().profile.currentTaskId === this.props.task._id ? this.props.task.taskName + " (Playing)" : this.props.task.taskName }
                rightIconButton={
                    <IconButton
                        iconClassName="fa fa-ellipsis-v"
                        style={{padding: '-12px'}}
                        onClick={this.openTaskDetails}
                        tooltip="Settings"/>}
            />

            <Modal
                open={this.state.open}
                onOpen={this.openTaskDetails}
                onClose={this.closeTaskDetails}
                as="div"
                className = "taskDetails"
                size = "small">

                <Modal.Header className = "taskDetailsTitle">Task Details</Modal.Header>
                    <Modal.Content className="taskDetailsContent" list>
                        <p className="taskName">{this.props.task.taskName}</p>

                        <div className="priority each">
                            <p className="target">Priority:</p>
                            <p className="value">{this.props.task.taskPriority}</p>
                        </div>

                        <div className="pomoTime each">
                            <p className="target">Pomotime:</p>
                            <p className="value">{this.props.task.pomoCount}</p>
                        </div>

                        <div className="estPomos each">
                            <p className="target">Estimated Pomos:</p>
                            <p className="value">{this.props.task.pomoGoal}</p>
                        </div>

                        <div className="due each">
                            <p className="target">Due Date:</p>
                            <p className="value">{moment(this.props.task.dueDate).format("MMM Do YY")}</p>
                        </div>
                    </Modal.Content>
                    <div className = "taskDetailsActions">{actions}</div>
                </Modal>
        </div>
    )
  }
}
