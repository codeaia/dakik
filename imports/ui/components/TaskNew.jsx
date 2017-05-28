import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import Noty from 'noty';

import Loading from './Loading.jsx';
import Nav from './Nav.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { Button, Header, Icon, Modal, Segment, Input, Dropdown, Label, Form, TextArea } from 'semantic-ui-react';

var priority = [
  {key:0, text: "None", color: "black"},
  {key:1, text: "1", color: "red"},
  {key:2, text: "2", color: "orange"},
  {key:3, text: "3", color: "yellow"},
  {key:4, text: "4", color: "teal"},
  {key:5, text: "5", color: "green"}
];

var goal = [
  {key:0, text: "No Goal"},
  {key:1, text: "1 Pomo"},
  {key:2, text: "2 Pomo"},
  {key:3, text: "3 Pomo"},
  {key:4, text: "4 Pomo"},
  {key:5, text: "5 Pomo"},
  {key:6, text: "6 Pomo"},
  {key:7, text: "7 Pomo"},
  {key:8, text: "8 Pomo"},
  {key:9, text: "9 Pomo"},
  {key:10,text: "10 Pomo"}
];

export default class TaskNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: '',
      taskPriority: 0,
      checked: false,
      pomoGoal: 0,
      dueDate: null,
      moreInfo: ""
    };

    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.updateTaskGoal = this.updateTaskGoal.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);
    this.updateMoreInfo = this.updateMoreInfo.bind(this);
  }

  updateTaskGoal(event, data) {
    this.setState({
      pomoGoal: data.value
    });
  }

  updateTaskName(event, data){
    this.setState({
      taskName: data.value
    });
  }

  updateMoreInfo(event, data){
   this.setState({
     moreInfo: data.value
   });
 }

  updatePriority(event, data){
    this.setState({
      taskPriority: data.value
    });
  }

  addNewTask(){
    Meteor.call(
      'addTask',
      this.state.taskName,
      this.state.taskPriority,
      this.state.pomoGoal,
      "none",
      this.state.dueDate,
      this.state.moreInfo
    );
    new Noty({
      type: 'success',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Added Task',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
    this.props.history.push('/');
  }

  updateDueDate(event, data) {
    this.setState({
      dueDate: data.value,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav history={this.props.history} location={this.props.location}/>
          <div className="taskNew">
			<h3 className = "taskNewHeader">Add a new task...</h3>
            <div className="taskNewContent">
                 <Input
                   label='Task Name'
                   size='small'
                   id="edit-task-name"
                   value={this.state.taskName}
                   type="text"
                   onChange={this.updateTaskName}
                   className='taskName each'
                 />
            <div className="dropdownCont each">
              <Dropdown
                labeled
                className='priority'
                trigger={
                  <Label size = "medium" as='div' color = {priority[this.state.taskPriority].color} image>
                    Priority:
                    <Label.Detail as = "span">{priority[this.state.taskPriority].text }</Label.Detail>
                  </Label>
                }>
                <Dropdown.Menu>
                  {priority.map((item) => (
                    <Dropdown.Item
                      key={item.key}
                      label={{ color: item.color, empty: true, circular: true }}
                      text = {item.text}
                      value = {item.key}
                      onClick={this.updatePriority}/>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                className='pomoGoal'
                trigger={
                  <Label size = "medium" as='div' color = "grey" image>
                    Goal:
                    <Label.Detail as = "span">{goal[this.state.pomoGoal].text }</Label.Detail>
                  </Label>
                }>
                  <Dropdown.Menu>
                    {goal.map((item) => (
                      <Dropdown.Item
                        key={item.key}
                        text = {item.text}
                        value = {item.key}
                        onClick={this.updateTaskGoal}/>
                    ))}
                  </Dropdown.Menu>
              </Dropdown>
            </div>
                <DatePicker
                  hintText="Due Date"
                  value={this.state.dueDate}
                  onChange={this.updateDueDate}
				  className="each"
				 />
                <Form className = "each">
                  <TextArea
                    size='large'
                    placeholder = "More Info"
                    value={this.state.moreInfo}
                    onChange={this.updateMoreInfo}
                    className = "each moreInfo"
                  />
                </Form>
            </div>
            <div className="taskNewActions">
                <Button
                  size = "medium"
                  icon={<Icon as='span' className='fa fa-times-circle'/>}
                  negative
                  content="Cancel"
                  labelPosition='left'
                  onClick={() => this.props.history.push('/')}
                  />
                <Button
                  size = "medium"
                  icon={<Icon as='span' className='fa fa-check'/>}
                  positive
                  content="Add Task"
                  labelPosition='left'
                  onClick={() => this.addNewTask()}
                  />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
