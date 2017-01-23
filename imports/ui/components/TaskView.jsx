import React, { Component, PropTypes, constructor, State } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import ActionsMenu from './ActionsMenu.jsx';
import Counter from './Counter.jsx';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TaskFrame from './TaskFrame.jsx';
import {MdAddBox} from 'react-icons/lib/md';
import IconButton from 'material-ui/IconButton';

export default class TaskView extends Component {

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
      <TaskFrame key={task._id} task={task}/>
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
