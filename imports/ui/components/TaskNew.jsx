import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import { Link } from 'react-router-dom';

import Loading from './Loading.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

export default class TaskNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      taskPriority: 0,
      checked: false,
      taskGoal: 0,
      dueDate: null,
    };

    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.updateTaskGoal = this.updateTaskGoal.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);
  }

  updateTaskGoal(event, value) {
    this.setState({
      taskGoal: value
    });
  }

  updateTaskName(e){
    this.setState({
      taskName: e.target.value
    });
  }

  updatePriority(event, value){
    this.setState({
      taskPriority: value
    });
  }

  addNewTask(event){
    Meteor.call(
      'addTask',
      this.state.taskName,
      this.state.taskPriority,
      this.state.taskGoal,
      "none",
      this.state.dueDate
    );
  }

  updateDueDate(event, date) {
    this.setState({
      dueDate: date,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox className="taskNewContainer">
          <Card className="taskNewCard">
			<h3 className = "taskNewHeader">Add a new task...</h3>
            <CardText className="taskNewCardText">
              <Flexbox flexDirection="column">
                <TextField
                  value={this.state.taskName}
                  type="text"
                  onChange={this.updateTaskName}
                  floatingLabelText="Task Name"
				  className = "taskName each"
				  id="add-task-name"
                />
                <SelectField
                  floatingLabelText="Priority"
                  value={this.state.taskPriority}
                  onChange={this.updatePriority}
				  className="each"
				>
                  <MenuItem value={0} primaryText="0 (No Priority)" />
                  <MenuItem value={1} primaryText="1 (Urgent)" />
                  <MenuItem value={2} primaryText="2 (Today)" />
                  <MenuItem value={3} primaryText="3 (This Week)" />
                  <MenuItem value={4} primaryText="4 (This Month)" />
                  <MenuItem value={5} primaryText="5 (Any Time)" />
                </SelectField>
                <SelectField
                  floatingLabelText="Task Goal"
                  value={this.state.taskGoal}
                  onChange={this.updateTaskGoal}
				  className="each"
 				>
                  <MenuItem value={1} primaryText="1" />
                  <MenuItem value={2} primaryText="2" />
                  <MenuItem value={3} primaryText="3" />
                  <MenuItem value={4} primaryText="4" />
                  <MenuItem value={5} primaryText="5" />
                  <MenuItem value={6} primaryText="6" />
                  <MenuItem value={7} primaryText="7" />
                  <MenuItem value={8} primaryText="8" />
                  <MenuItem value={9} primaryText="9" />
                  <MenuItem value={10} primaryText="10" />
                </SelectField>
                <DatePicker
                    hintText="Due Date"
                    value={this.state.dueDate}
                    onChange={this.updateDueDate}
					className="each"
				/>
              </Flexbox>
            </CardText>
            <CardActions className="taskNewActions">
              <Link to="/">
                <RaisedButton className="cancel" label="Cancel"/>
              </Link>
              <Link to="/">
                <RaisedButton className="ok" label="Add Task" onClick={this.addNewTask}/>
              </Link>
            </CardActions>
          </Card>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}
