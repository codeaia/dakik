import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Tasks } from '../../api/tasks.js';
import Counter from './Counter.jsx';
import TaskContainer from './TaskContainer.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flexbox className="app">
        <Flexbox className="timerCont" >
          <Counter className="timer"/>
        </Flexbox>
        <Flexbox className="taskList">
          <TaskContainer/>
        </Flexbox>
      </Flexbox>
    );
  }
}
