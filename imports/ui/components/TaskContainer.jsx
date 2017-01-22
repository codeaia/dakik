import React, { Component, PropTypes, constructor, State } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Tasks } from '../../api/tasks.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import ActionsMenu from './ActionsMenu.jsx';
import Counter from './Counter.jsx';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TaskFrame from './TaskFrame.jsx';
import {MdAddBox} from 'react-icons/lib/md';
import IconButton from 'material-ui/IconButton';

class TaskContainer extends Component {

  constructor(props) {
    super(props);

    this.routeNewTask = this.routeNewTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
  }

  routeNewTask(){
    FlowRouter.go('/taskNew/');
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <TaskFrame task={task}/>
    ));
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card className="taskListCard">
          <CardText>
            <Subheader>
              #TagNameHere
              <MdAddBox className="addButton" onClick={this.routeNewTask}></MdAddBox>
            </Subheader>
            <List>
              {this.renderTasks()}
            </List>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

TaskContainer.propTypes = {
  currentUser: PropTypes.object,
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    tasks: Tasks.find({ownerId: Meteor.user()._id}).fetch(),
  };
}, TaskContainer);
