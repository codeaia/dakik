import React, { Component, PropTypes, constructor, State } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Tasks } from '../../api/tasks.js';

import ActionsMenu from './ActionsMenu.jsx';
import Counter from './Counter.jsx';
import TaskFrame from './TaskFrame.jsx';
import { MdHome, MdPlaylistAddCheck, MdInsertChart ,MdAddBox} from 'react-icons/lib/md';

class TaskContainer extends Component {

  constructor(props) {
    super(props);
    this.renderTasks = this.renderTasks.bind(this);

    console.log('Task Container Loaded..');
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <TaskFrame key={task._id} task={task} taskName={task.taskName} totalPomos={task.totalPomos}/>
    ));
  }

  render() {
    return (
      <Flexbox className="app" flexDirection="column">
        <Flexbox className="taskList">
          {this.renderTasks()}
        </Flexbox>
      </Flexbox>
    );
  }
}

TaskContainer.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, TaskContainer);
