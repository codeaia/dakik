import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Tasks } from '../../api/tasks.js';

import Counter from './Counter.jsx';
import TaskFrame from './TaskFrame.jsx';

import { MdHome, MdPlaylistAddCheck, MdInsertChart ,MdAddBox} from 'react-icons/lib/md';

class Home extends Component {

  constructor(props) {
    super(props);
    console.log('Home Page Loaded..');

    this.renderTasks = this.renderTasks.bind(this);
    this.newTask = this.newTask.bind(this);

    props = {
      tagName: "",
      color: "",
      totalPomos: ""
    };
  }

  newTask(){
    FlowRouter.go('/');
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <TaskFrame key={task._id} task={task} taskName={task.taskName} totalPomos={task.totalPomos}/>
    ));
  }

  render() {
    return (
      <div className="app">
        <Counter />
        <Flexbox className="tagFrame" style={{backgroundColor: this.props.color}}>
          <Flexbox className = "tagFrameHeader">
            <p className = "tagName">#Placeholder{this.props.tagName}</p>
            <MdAddBox className = "addButton" onClick={this.newTask}></MdAddBox>
            <p className = "totalPomos">5{this.props.totalPomos}</p>
          </Flexbox>
          <Flexbox className="tagFrameBody">
            {this.renderTasks()}
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

Home.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, Home);
