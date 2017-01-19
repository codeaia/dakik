import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import { Tasks } from '../../api/tasks.js';

export default class TaskFrame extends Component {

  constructor(props) {
    super(props);

    this.toggleChecked = this.toggleChecked.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.routeEdit = this.routeEdit.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.taskId, {
      $set: { checked: !this.props.task.checked },
    });
  }

  handleDelete() {
    Tasks.remove(this.props.taskId);
  }

  routeEdit(){

  }

  handleShare(){

  }

  render() {
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="Options.."
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Share</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <MuiThemeProvider>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText={this.props.taskName}
          secondaryText="More information"
          rightIconButton={rightIconMenu}
        />
      </MuiThemeProvider>
    );
  }
}
