import React, { Component, PropTypes, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import Loading from './Loading.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Tasks } from '../../api/tasks.js';

class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: 'loading',
      taskPriority: 1,
      checked: false,
    };

    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.editNewTask = this.editNewTask.bind(this);
  }

  componentDidMount(){
    if (this.props.task !== undefined) {
      this.setState({
        taskName: this.props.task.taskName,
        taskPriority: this.props.task.taskPriority,
        checked: this.props.task.checked,
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.task !== undefined) {
      this.setState({
        taskName: nextProps.task.taskName,
        taskPriority: nextProps.task.taskPriority,
        checked: nextProps.task.checked,
      });
    }
  }

  componentWillUnmount(){
    this.props.handleSub.stop();
  }

  updateTaskName(event, value){
    this.setState({
      taskName: value
    });
  }

  updatePriority(event, index, value){
    this.setState({
      taskPriority: value
    });
  }

  cancelEdit(){
    FlowRouter.go('/');
  }

  editNewTask(){
    const taskId = this.props.task._id;
    const taskName = this.state.taskName;
    const taskPriority = this.state.taskPriority;
    const ownerId = this.props.currentUser._id;
    const checked = false;
    const totalPomos = 0;

    Tasks.update(
      {_id: taskId},
      {$set: {
        taskName,
        taskPriority,
        ownerId,
        checked,
        totalPomos,
        }
      }
    );

    Session.set({
      "snackbarMessage": "Task updated",
      "snackbar": true
    });
    Meteor.setTimeout(function(){
      Session.set({
        "snackbar": false
      });
    },4000);

    FlowRouter.go('/');
  }

  render() {
    if(this.props.task !== undefined || this.props.currentUser !== undefined){
      return (
        <MuiThemeProvider>
          <Flexbox className="auth">
            <Card>
              <CardText>
                <Flexbox flexDirection="column">
                  <TextField
                    name={this.state.taskName}
                    type="text"
                    onChange={this.updateTaskName}
                    value={this.state.taskName}
                    floatingLabelText="Task Name"
                    />
                  <SelectField
                    floatingLabelText="Priority"
                    value={this.state.taskPriority}
                    onChange={this.updatePriority}
                    >
                    <MenuItem value={0} primaryText="0 (No Priority)" />
                    <MenuItem value={1} primaryText="1 (Urgent)" />
                    <MenuItem value={2} primaryText="2 (Today)" />
                    <MenuItem value={3} primaryText="3 (This Week)" />
                    <MenuItem value={4} primaryText="4 (This Month)" />
                    <MenuItem value={5} primaryText="5 (Any Time)" />
                  </SelectField>
                </Flexbox>
              </CardText>
              <CardActions>
                <RaisedButton label="Cancel" onClick={this.cancelEdit} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
                <RaisedButton label="Edit Task" onClick={this.editNewTask} backgroundColor = "#004D40" labelColor="#FFFFFF"/>
              </CardActions>
            </Card>
          </Flexbox>
        </MuiThemeProvider>
      );
    } else {
      return (
        <Flexbox className="app">
          <Loading/>
        </Flexbox>
      );
    }
  }
}

export default TaskEditContainer = createContainer(() => {
  const handleSub = Meteor.subscribe('tasks');
  const currentUser = Meteor.user();
  const taskId = FlowRouter.getParam("_id");
  const task = Tasks.findOne({_id: taskId});

  return {
    currentUser,
    task,
    handleSub,
  };
}, TaskEdit);
