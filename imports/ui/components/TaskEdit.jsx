import React, { Component } from 'react';
import Noty from 'noty';
import { Button, Header, Icon, Input, Dropdown, Label, Form, TextArea } from 'semantic-ui-react';

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

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: this.props.location.state.task.taskName,
      taskPriority: this.props.location.state.task.taskPriority,
      pomoGoal: this.props.location.state.task.pomoGoal,
      moreInfo: this.props.location.state.task.details
    };

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);

    this.updateTaskName = this.updateTaskName.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.updateTaskGoal = this.updateTaskGoal.bind(this);
    this.updateMoreInfo = this.updateMoreInfo.bind(this);
  };

  save(){
    Meteor.call('editTask',
      this.props.location.state.task._id,
      this.state.taskName,
      this.state.taskPriority,
      this.state.pomoGoal,
      this.state.moreInfo
    );

    this.props.history.push('/');
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Task is updated',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  }

  cancel(){
    this.props.history.push('/');
  }

  updateTaskName(event, data){
    this.setState({
      taskName: data.value
    });
  }

  updateMoreInfo(event, data){
    this.setState({
       moreInfo: data.value,
    });
  }

  updatePriority(event, data){
    this.setState({
      taskPriority: data.value
    });
  }

  updateTaskGoal(event, data) {
    this.setState({
      pomoGoal: data.value
    });
  }

  render() {
    return (
      <div className="taskEdit">
        <h3 className = "taskEditHeader">Edit this task...</h3>
        <div className="taskEditContent">
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
        <div className ="taskEditActions">
          <Button
            size = "medium"
            icon={<Icon as='span' className='fa fa-times-circle'/>}
            negative
            content="Cancel"
            labelPosition='left'
            onClick={() => this.cancel()}
          />
          <Button
            size = "medium"
            icon={<Icon as='span' className='fa fa-check'/>}
            positive
            content="Save"
            labelPosition='left'
            onClick={() => this.save()}
          />
        </div>
      </div>
    );
  }
}
