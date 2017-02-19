import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import { Session } from 'meteor/session'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Tasks } from '../../api/tasks.js';

class TaskNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      taskPriority: 0,
      checked: false,
    };

    this.cancelAdding = this.cancelAdding.bind(this);
    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.addNewTask = this.addNewTask.bind(this);

  }

  updateTaskName(e){
    this.setState({
      taskName: e.target.value
    });
  }

  updatePriority(event, index, value){
    this.setState({
      taskPriority: value
    });
  }

  cancelAdding(){
    FlowRouter.go('/');
  }

  addNewTask(event){
    const taskName = this.state.taskName;
    const taskPriority = this.state.taskPriority;
    const ownerId = this.props.currentUser._id;
    const checked = false;
    const totalPomos = 0;

    Session.set({
      "snackbarMessage": "Task added",
      "snackbar": true
    });
    
    Meteor.setTimeout(function(){
      Session.set({
        "snackbar": false
      });
    },4000);

    Tasks.insert({
      ownerId,
      taskName,
      taskPriority,
      checked,
      totalPomos,
      createdAt: new Date(), // current time
    });

    FlowRouter.go('/');
  }

  render() {
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
              <RaisedButton label="Cancel" onClick={this.cancelAdding} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
              <RaisedButton label="Add Task" onClick={this.addNewTask} backgroundColor = "#004D40" labelColor="#FFFFFF"/>
            </CardActions>
          </Card>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}

TaskNew.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, TaskNew);
