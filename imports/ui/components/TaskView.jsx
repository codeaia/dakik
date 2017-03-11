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

export default class TaskView extends Component {

  constructor(props) {
    super(props);

    if(Session.get('startNumber') == 0) {
      this.state = {
        hideCompleted: false,
        allTasksLength: 0,
        viewTasks: [],
        disabledPrev: true,
        disabledNext: false
      };
    } else if(Session.get('endNumber') == this.props.tasks.length) {
      this.state = {
        hideCompleted: false,
        allTasksLength: 0,
        viewTasks: [],
        disabledPrev: false,
        disabledNext: true
      };
    } else {
      this.state = {
        hideCompleted: false,
        allTasksLength: 0,
        viewTasks: [],
        disabledPrev: false,
        disabledNext: false
      };
    }

    this.routeNewTask = this.routeNewTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.prevButton = this.prevButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  nextButton() {
    if(Session.get('endNumber') == this.state.allTasksLength) {
      //Just Checking
    } else if((Session.get('endNumber')+5) > this.state.allTasksLength) {
      Session.set('startNumber', Session.get('startNumber') + 5);
      Session.set('endNumber', this.state.allTasksLength);
    } else {
      Session.set('startNumber', Session.get('startNumber') + 5);
      Session.set('endNumber', Session.get('endNumber') + 5);
    }

    if(Session.get('endNumber') == this.state.allTasksLength) {
      this.state.disabledNext = true;
    } else {
      this.state.disabledPrev = false;
      this.state.disabledNext = false;
    }

    this.setState(this.state);
  }

  prevButton() {
    if(Session.get('endNumber') == this.state.allTasksLength) {
      Session.set('startNumber', Session.get('startNumber') - 5);
      if((this.state.allTasksLength % 5) == 0) {
        Session.set('endNumber', Session.get('endNumber') - 5);
      } else {
        Session.set('endNumber', Session.get('endNumber') - this.state.allTasksLength % 5);
      }
    } else if((Session.get('startNumber')-5) < 0) {
      Session.set('startNumber', 0);
      Session.set('endNumber', Session.get('endNumber') - Session.get('startNumber'));
    } else {
      Session.set('startNumber', Session.get('startNumber') - 5);
      Session.set('endNumber', Session.get('endNumber') - 5);
    }

    if(Session.get('startNumber') == 0) {
      this.state.disabledPrev = true;
    } else {
      this.state.disabledPrev = false;
      this.state.disabledNext = false;
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
      this.state.allTasksLength = this.props.tasks.length;
      this.state.viewTasks = [];

      console.log(this.state.allTasksLength);
      let filteredTasks = this.props.tasks;

      if(this.state.allTasksLength<=Session.get('startNumber')) {
        Session.set('startNumber', Session.get('startNumber') - 5);
        Session.set('endNumber', Session.get('endNumber') - 1);
      }
      if(this.state.allTasksLength<Session.get('endNumber')) {
        Session.set('endNumber', this.state.allTasksLength);
      }

      for(i=Session.get('startNumber');i<Session.get('endNumber');i++) {
        this.state.viewTasks[i] = filteredTasks[i];
      }

      if (this.state.hideCompleted) {
        this.state.viewTasks = this.state.viewTasks.filter(task => !task.checked);
      }

      return this.state.viewTasks.map((task) => (
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
                  <RaisedButton label="Prev" disabled={this.state.disabledPrev} onClick={this.prevButton} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
                  <RaisedButton label="Next" disabled={this.state.disabledNext} onClick={this.nextButton} backgroundColor = "#FFFFFF" labelColor="#004D40"/>
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
