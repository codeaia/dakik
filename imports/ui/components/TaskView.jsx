import React, { Component, PropTypes, constructor, State } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TaskFrame from './TaskFrame.jsx';
import {MdAddBox} from 'react-icons/lib/md';

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
    if (this.props.tasks) {
      return this.props.tasks.map((task) => (
        <TaskFrame key={task._id} task={task}/>
      ));
    } else {
      <div>loading tasks</div>
      // TODO : change with loading component
    }
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
