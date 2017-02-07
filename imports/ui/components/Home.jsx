import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Tasks } from '../../api/tasks.js';
import TimerContainer from './TimerContainer.jsx';
import TaskViewContainer from './TaskViewContainer.jsx';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flexbox className="app">
        <Flexbox className="timerContainers" >
          <TimerContainer/>
        </Flexbox>
        <Flexbox className="taskList">
          <TaskViewContainer/>
        </Flexbox>
      </Flexbox>
    );
  }
}
