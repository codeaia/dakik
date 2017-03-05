import React, { Component, PropTypes, constructor, State } from 'react';

import Flexbox from 'flexbox-react';
import IconButton from 'material-ui/IconButton';
import Loading from './Loading.jsx';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import {Card, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import TaskFrame from './TaskFrame.jsx';

import RaisedButton from 'material-ui/RaisedButton';

startNumber = 0;
endNumber = 5;
allTasksLength = 0;

export default class TaskView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };

    this.routeNewTask = this.routeNewTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.prevButton = this.prevButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  nextButton() {
    if(endNumber == allTasksLength) {
      //Just Checking
    } else if((endNumber+5) > allTasksLength) {
      startNumber = startNumber + 5;
      endNumber = allTasksLength;
    } else {
      startNumber = startNumber + 5;
      endNumber = endNumber + 5;
    }

    this.setState(this.state);
  }

  prevButton() {
    if(endNumber == allTasksLength) {
      startNumber = startNumber - 5;
      if((allTasksLength % 5) == 0) {
        endNumber = endNumber - 5;
      } else {
        endNumber = endNumber - allTasksLength % 5;
      }
    } else if((startNumber-5) < 0) {
      startNumber = 0;
      endNumber = endNumber - startNumber;
    } else {
      startNumber = startNumber - 5;
      endNumber = endNumber - 5;
    }

    this.setState(this.state);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentUser !== undefined) {
      this.setState({
        hideCompleted: nextProps.currentUser.profile.hideCompleted,
      });
    }
  }

  routeNewTask(){
    Session.set({
      "route": "taskNew"
    });
  }

  renderTasks(){
    if(this.props.tasks.length != 0) {
      allTasksLength = this.props.tasks.length;
      console.log(allTasksLength);
      let filteredTasks = this.props.tasks;
      let allTasks = [];

      for(i=startNumber;i<endNumber;i++) {
        allTasks[i] = filteredTasks[i];
      }

      if (this.state.hideCompleted) {
        allTasks = allTasks.filter(task => !task.checked);
      }

      return allTasks.map((task) => (
          <TaskFrame key={task._id} task={task} currentUser={this.props.currentUser}/>
      ));
    }
  }

  toggleHide(){
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });

    var newProfile = this.props.currentUser.profile;
    newProfile.hideCompleted = !this.props.currentUser.profile.hideCompleted;

    Meteor.users.update({_id: this.props.currentUser._id},{$set: {profile: newProfile}});
  }

  render() {
    if (this.props.tasks !== undefined && this.props.currentUser !== undefined) {
      return (
        <MuiThemeProvider>
          <Flexbox className="taskList">
            <Card className="taskListCard">
              <CardText>
                <Subheader>
                  #TagNameHere
                  <IconButton iconClassName="fa fa-plus-square-o" style={{padding: '-12px'}} onClick={this.routeNewTask} tooltip="New Task"/>
                  <RaisedButton label="Prev" onClick={this.prevButton} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
                  <RaisedButton label="Next" onClick={this.nextButton} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
                  <Toggle label="Hide completed tasks" labelPosition="right" toggled={this.state.hideCompleted} onToggle={this.toggleHide}/>
                </Subheader>
                <List>
                  {this.renderTasks()}
                </List>
              </CardText>
            </Card>
          </Flexbox>
        </MuiThemeProvider>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}

  TaskView.propTypes = {
    currentUser: React.PropTypes.object,
    tasks: React.PropTypes.array,
  };
