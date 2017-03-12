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
import ReactCSSTransition from 'react-addons-css-transition-group';

export default class TaskView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      disabledPrev: true,
      disabledNext: false,
      startNumber: 0,
      endNumber: 5
    };

    this.routeNewTask = this.routeNewTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.prevButton = this.prevButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.updateDisabledPrev = this.updateDisabledPrev.bind(this);
    this.updateDisabledNext = this.updateDisabledNext.bind(this);
    this.updateEndNumber = this.updateEndNumber.bind(this);
    this.updateStartNumber = this.updateStartNumber.bind(this);
  }

  updateDisabledPrev(value) {
    this.setState({
      disabledPrev: value
    });
  }

  updateDisabledNext(value) {
    this.setState({
      disabledNext: value
    });
  }

  updateEndNumber(value) {
    this.setState({
      endNumber: value
    });
  }

  updateStartNumber(value) {
    this.setState({
      startNumber: value
    });
  }

  nextButton() {
    if((this.state.endNumber + 5) > this.props.tasks.length) {
      this.setState({
        disabledPrev: false,
        disabledNext: true,
        startNumber: this.state.startNumber + 5,
        endNumber: this.props.tasks.length
      });
    } else {
      if((this.state.endNumber + 5) == this.props.tasks.length) {
        this.setState({
          disabledPrev: false,
          disabledNext: true,
          startNumber: this.state.startNumber + 5,
          endNumber: this.state.endNumber + 5
        });
      } else {
        this.setState({
          disabledPrev: false,
          disabledNext: false,
          startNumber: this.state.startNumber + 5,
          endNumber: this.state.endNumber + 5
        });
      }
    }
  }

  prevButton() {
    if(this.state.endNumber == this.props.tasks.length) {
      this.updateStartNumber(this.state.startNumber - 5);

      if((this.props.tasks.length % 5) == 0) {
        this.updateEndNumber(this.state.endNumber - 5);
      } else {
        this.updateEndNumber(this.state.endNumber - this.props.tasks.length % 5);
      }
    } else if((this.state.startNumber-5) < 0) {
      this.updateStartNumber(0);
      this.updateEndNumber(this.state.endNumber - this.state.startNumber);
    } else {
      this.updateStartNumber(this.state.startNumber - 5);
      this.updateEndNumber(this.state.endNumber - 5);
    }

    if(this.state.startNumber-5 == 0) {
      this.updateDisabledPrev(true);
    } else {
      this.updateDisabledPrev(false);
      this.updateDisabledNext(false);
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentUser !== undefined && nextProps.tasks.length != 0) {
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

      console.log(this.props.tasks.length);
      let filteredTasks = this.props.tasks;
      let viewTasks = [];

      if(this.state.endNumber > this.props.tasks.length) {
        for(i=this.state.startNumber;i<this.props.tasks.length;i++) {
          viewTasks[i] = filteredTasks[i];
        }
      } else {
        for(i=this.state.startNumber;i<this.state.endNumber;i++) {
          viewTasks[i] = filteredTasks[i];
        }
      }

      if (this.state.hideCompleted) {
        viewTasks = viewTasks.filter(task => !task.checked);
      }

      return viewTasks.map((task) => (
          <TaskFrame key={task._id}
            task={task}
            currentUser={this.props.currentUser}
            startNumber={this.state.startNumber}
            endNumber={this.state.endNumber}
            length={this.props.tasks.length}
            updateStartNumber={this.updateStartNumber}
            updateEndNumber={this.updateEndNumber}
            />
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

  TaskView.propTypes = {
    currentUser: React.PropTypes.object,
    tasks: React.PropTypes.array,
  };
