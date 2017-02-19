import React, { Component, PropTypes, constructor, State } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import Flexbox from 'flexbox-react';

import Loading from './Loading.jsx';

import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TaskFrame from './TaskFrame.jsx';
import {MdAddBox} from 'react-icons/lib/md';

export default class TaskView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: true,
    };

    this.routeNewTask = this.routeNewTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
  }

  routeNewTask(){
    FlowRouter.go('/taskNew/');
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <TaskFrame key={task._id} task={task} currentUser={this.props.currentUser}/>
    ));
  }

  toggleHide(){
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
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
                  <MdAddBox className="addButton" onClick={this.routeNewTask}></MdAddBox>
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
