import React, { Component, constructor } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Icon, Card } from 'semantic-ui-react'

import { Tasks } from '../../api/tasks.js';

import Loading from './Loading.jsx';
import TaskFrame from './TaskFrame.jsx';

class TaskView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };

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

  renderTasks(){
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => (
      <TaskFrame key={task._id} task={task} history={this.props.history} location={this.props.location} length={this.props.length}/>
    ));
  }

  toggleHide(){
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
    Meteor.users.update(Meteor.userId(),{$set: {
      "profile.hideCompleted": !Meteor.user().profile.hideCompleted,
    }});
  }

  render() {
    return (
      <Card className="taskListCard taskList">
        <ReactCSSTransition
          transitionName = "taskFrameLoad"
          transitionEnterTimeout = {600}
          transitionLeaveTimeout = {400}>
          <Card.Content className="newTaskButton">
            <Button
              icon={<Icon as='span' className='fa fa-plus' />}
              onClick={() => this.props.history.push('/taskNew')}
            />
          </Card.Content>
          <Card.Content>
            <div className='taskList'>
              {this.renderTasks()}
            </div>
          </Card.Content>
        </ReactCSSTransition>
      </Card>
    );
  }
}

export default TaskViewContainer = createContainer(() => {
  var skip = Session.get('skip');

  Meteor.subscribe('tasks', skip);
  var length = Tasks.find().count();
  var tasks = Tasks.find({}, {limit: 5, sort: { createdAt: -1 }}).fetch();

  return {
    length,
    tasks,
  };
}, TaskView);
