import React, { Component, PropTypes, constructor, State } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Tasks } from '../../api/tasks.js';

import Loading from './Loading.jsx';
import TaskFrame from './TaskFrame.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import {Card, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

class TaskView extends Component {
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

  prevButton() {
    Session.set('skip', Session.get('skip') - 5);
  }

  nextButton() {
    Session.set('skip', Session.get('skip') + 5);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentUser) {
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
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => (
      <TaskFrame key={task._id} task={task} length={this.props.length}/>
    ));
  }

  toggleHide(){
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });

    var newProfile = Meteor.user().profile;
    newProfile.hideCompleted = !Meteor.user().profile.hideCompleted;

    Meteor.users.update(Meteor.userId(),{$set: {profile: newProfile}});
  }

  render() {
    if (this.props.tasks && Meteor.user()) {
      return (
        <MuiThemeProvider>
          <Flexbox>
            <Card className="taskListCard">
              <CardText>
                <Subheader className="subheader">
                  #TagNameHere
                  <IconButton iconClassName="fa fa-plus-square-o" style={{padding: '-12px'}} onClick={this.routeNewTask} tooltip="New Task"/>
                  <RaisedButton label="Prev" disabled={Session.get('skip') === 0 ? true : false} onClick={this.prevButton} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
                  <RaisedButton label="Next" disabled={this.props.length != 6 ? true : false} onClick={this.nextButton} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
                  <Toggle label="Hide completed" labelPosition="right" toggled={this.state.hideCompleted} onToggle={this.toggleHide} className="toggleChecked"/>
                </Subheader>
                <List className="taskList">
                  <ReactCSSTransition
                    transitionName = "taskFrameLoad"
                    transitionEnterTimeout = {600}
                    transitionLeaveTimeout = {400}>
                      {this.renderTasks()}
                  </ReactCSSTransition>
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

export default TaskViewContainer = createContainer(() => {
  var skip = Session.get('skip');

  Meteor.subscribe('tasks', skip);
  var length = Tasks.find().count();
  var tasks = Tasks.find({}, {limit: 5}).fetch();

  return {
    length,
    tasks,
  };
}, TaskView);
