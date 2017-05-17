import React, { Component } from 'react';
import Loading from './Loading.jsx';

import { Tasks } from '../../api/tasks.js';

import { ListItem } from 'material-ui/List';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import { Button, Header, Icon, Modal, Segment } from 'semantic-ui-react';

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: this.props.location.state.task.taskName,
      taskPriority: this.props.location.state.task.taskPriority,
      taskGoal: this.props.location.state.task.taskGoal,
      dueDate: this.props.location.state.task.dueDate,
      moreInfo: ""
    };

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);

    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.updateTaskGoal = this.updateTaskGoal.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);
    this.updateMoreInfo = this.updateMoreInfo.bind(this);

    this.addToTrello = this.addToTrello.bind(this);
    this.addToWunderlist = this.addToWunderlist.bind(this);
  }

  addToTrello() {
    Meteor.call("postInfo", this.state.taskName, this.state.dueDate);
  }

  addToWunderlist() {
    Meteor.call("postSomething", this.state.taskName, this.state.dueDate);
  }

  save(){
    Meteor.call('editTask', this.props.location.state.task._id, this.state.taskName, this.state.taskPriority, this.state.pomoGoal, this.state.dueDate,this.state.moreInfo );
    this.props.history.push('/');
  }

  cancel(){
    this.props.history.push('/');
  }

  updateTaskName(event, value){
    this.setState({
      taskName: value
    });
  }

 updateMoreInfo(event, value){
    this.setState({
       moreInfo: event.target.value,
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

  render() {
    return (
      <MuiThemeProvider>
        <div className="taskEdit">
          <div className="taskEditContent">
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
              floatingLabelText="Due Date"
              value={this.state.dueDate}
              onChange={this.updateDueDate}
              className = "each"
              />
            <TextField
                className="each"
                hintText="More Info..."
                multiLine={true}
                rows={2}
                rowsMax={4}
                value={this.state.moreInfo}
                onChange={this.updateMoreInfo}
            />
          </div>
          <div className ="taskEditActions">
            <Button
              icon={<Icon as='span' className='fa fa-times-circle'/>}
              negative
              content="Cancel"
              labelPosition='left'
              onClick={() => this.cancel()}
              />
            <Button
              icon={<Icon as='span' className='fa fa-check'/>}
              positive
              content="Save"
              labelPosition='left'
              onClick={() => this.save()}
              />
            <Button
              content="Import To Trello"
              labelPosition='left'
              onClick={() => this.addToTrello()}
              />
            <Button
              content="Import To Wunderlist"
              labelPosition='left'
              onClick={() => this.addToWunderlist()}
              />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
