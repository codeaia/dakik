import React, { Component } from 'react';
import Loading from './Loading.jsx';
var moment = require('moment');

import { ListItem } from 'material-ui/List';

import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import { Button, Header, Icon, Modal, List } from 'semantic-ui-react';

export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "taskDetails">
        <div className = "taskDetailsContent">
          <p className="taskName">{this.props.location.state.task.taskName}</p>
          <div className="priority each">
            <p className="target">Priority:</p>
            <p className="value">{this.props.location.state.task.taskPriority}</p>
          </div>
          <div className="pomoTime each">
            <p className="target">Pomotime:</p>
            <p className="value">{this.props.location.state.task.pomoCount}</p>
          </div>
          <div className="estPomos each">
            <p className="target">Estimated Pomos:</p>
            <p className="value">{this.props.location.state.task.pomoGoal}</p>
          </div>
          <div className="due each">
            <p className="target">Due Date:</p>
            <p className="value">{moment(this.props.location.state.task.dueDate).format("MMM Do YY")}</p>
          </div>
        </div>
      </div>
    );
  }
}
