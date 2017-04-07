import React, { Component, constructor, State } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import Flexbox from 'flexbox-react';
var moment = require('moment');

import { Tasks } from '../../api/tasks.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';

export default class TaskFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbar: false,
      message: 'error',
      checked: false,
      popup: false,
      popupEdit: false,
      popup2: false,

      taskName: this.props.task.taskName,
      taskPriority: this.props.task.taskPriority,
      taskGoal: this.props.task.taskGoal,
      dueDate: this.props.task.dueDate,
    }

    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.updateSnackbarText = this.updateSnackbarText.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.openEditTask = this.openEditTask.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.closePopup2 = this.closePopup2.bind(this);
    this.openEditPopup = this.openEditPopup.bind(this);
    this.editNewDetails = this.editNewDetails.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.updateTaskGoal = this.updateTaskGoal.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);
    this.startPomo = this.startPomo.bind(this);
  }

  componentDidMount(){
    this.setState({
      checked: this.props.task.checked,
    });
  }

  updateSnackbarText(value){
    this.setState({
      message: value
    });
  }

  openSnackbar(){
    this.setState({
      snackbar: true,
    });
  }

  closeSnackbar(){
    this.setState({
      snackbar: false,
    });
  }

  openPopup(){
    this.setState({
      popup: true
    });
  }

  closePopup() {
    this.setState({
      popup: false
    });
  }

  closePopup2() {
    this.setState({
      popup2: false
    });
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

  updateTaskGoal(event, value) {
    this.setState({
      taskGoal: value
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
        var tempProfile = Meteor.user().profile;
        tempProfile.playing = true;
        tempProfile.elapsedTime = 0;
        tempProfile.updateTime = (new Date()).valueOf();
        tempProfile.currentTaskId = this.props.task._id;
        Meteor.users.update(Meteor.userId(),{$set: {profile: tempProfile}});
        this.closePopup();
      }
    }
  }

  deleteTask(){
    if(this.props.length === 1) {
      Session.set('skip', Session.get('skip') - 5);
    }
    Meteor.call('deleteTask', this.props.task._id);
    this.setState({
      popup: false,
      popup2: false
    });
  }

  editNewDetails() {
    Meteor.call('editTask', this.props.task._id, this.state.taskName, this.state.taskPriority, this.state.taskGoal, this.state.dueDate);
    this.closePopup2();
  }

  openEditPopup() {
    this.setState({
      popup: false,
      popup2: true,
      taskName: this.props.task.taskName,
      taskPriority: this.props.task.taskPriority,
      taskGoal: this.props.task.taskGoal,
      dueDate: this.props.task.dueDate,
    });
  }

  openEditTask(){
    this.setState({
      popup: false,
      popupEdit: true
    });
  }

  toggleChecked() {
    Meteor.call('checkTask', this.props.task._id, !this.state.checked);
    this.setState({
      checked: !this.state.checked
    });
  }

  getStatus(){
    if (this.state.checked) {
      return 'checked';
    }
    return '';
  }

  render() {
    const actions = [
      <IconButton
        iconClassName="delete fa fa-trash-o"
        tooltip="DELETE"
        onClick={this.deleteTask}
        disabled={Meteor.user().profile.playing || Meteor.user().profile.elapsedTime > 0 ? true : false}
      />,
      <IconButton
        iconClassName="edit fa fa-pencil-square-o"
        tooltip="EDIT"
        onClick={this.openEditPopup}
        disabled={Meteor.user().profile.playing || Meteor.user().profile.elapsedTime > 0 ? true : false}
      />,
      <IconButton
        iconClassName="start fa fa-play"
        tooltip="START"
        onClick={this.startPomo}
        className = "actionButton start"
        disabled={Meteor.user().profile.playing || this.props.task.checked || Meteor.user().profile.elapsedTime > 0 ? true : false}
      />
    ];

    const actions2 = [
      <IconButton
        label="CANCEL"
        iconClassName="cancel fa fa-times-circle"
        onTouchTap={this.closePopup2}
      />,
      <IconButton
        label="SAVE"
        iconClassName="ok fa fa-check"
        onTouchTap={this.editNewDetails}
      />,
    ];

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="Options"
        tooltipPosition="bottom-left"
        iconClassName="fa fa-ellipsis-v"
      />
    );

    const leftCheckbox = (
      <Checkbox
        checked={this.state.checked}
        onCheck={this.toggleChecked}
      />
    );

    return (
      <MuiThemeProvider>
        <div className="taskFrame">
		  <progress className = "taskProgress" max = "101" value = {(this.props.task.totalPomos/this.props.task.taskGoal)*100+1}></progress>
          <ListItem
            className={"taskListItem " + this.getStatus()}
            leftCheckbox={leftCheckbox}
            primaryText={this.props.task.taskName}
            rightIconButton={
              <IconButton
                iconClassName="fa fa-ellipsis-v"
                style={{padding: '-12px'}}
                onClick={this.openPopup}
                tooltip="Settings"
              />
            }
          />
          <Dialog
            title="TASK DETAILS"
            actions={actions}
            modal={false}
            open={this.state.popup}
            onRequestClose={this.closePopup}
            className = "taskDetails"
            titleClassName="taskDetailsTitle"
            contentClassName="taskDetailsContent"
            bodyClassName="taskDetailsBody"
            actionsContainerClassName="taskDetailsActions"
          >
            <p className="taskName">{this.props.task.taskName}</p>

            <div className="priority each">
              <p className="target">Priority:</p>
              <p className="value">{this.props.task.taskPriority}</p>
            </div>

            <div className="pomoTime each">
              <p className="target">Pomotime:</p>
              <p className="value">{this.props.task.totalPomos}</p>
            </div>

            <div className="estPomos each">
              <p className="target">Estimated Pomos:</p>
              <p className="value">{this.props.task.taskGoal}</p>
            </div>

            <div className="due each">
              <p className="target">Due Date:</p>
              <p className="value">{moment(this.props.task.dueDate).format("MMM Do YY")}</p>
            </div>
          </Dialog>
          <Dialog
            title="TASK EDIT"
            actions={actions2}
            modal={false}
            open={this.state.popup2}
            onRequestClose={this.closePopup2}
            className="taskEditPop"
            titleClassName="taskEditTitle"
            contentClassName="taskEditContent"
            bodyClassName="taskEditBody"
            actionsContainerClassName="taskEditActions"
          >
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
              value={this.state.taskGoal}
              onChange={this.updateTaskGoal}
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
              hintText="Due Date"
              value={this.state.dueDate}
              onChange={this.updateDueDate}
              className = "each"
            />
            <Snackbar
              open={this.state.snackbar}
              message={this.state.message}
              autoHideDuration={4000}
              onRequestClose={this.closeSnackbar}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
