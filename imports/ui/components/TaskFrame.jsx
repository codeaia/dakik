import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import {mount} from 'react-mounter';

import Nav from './Nav.jsx';
import TaskEdit from './TaskEdit.jsx';
import {mainLayout} from '../layouts/mainLayout.jsx';

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
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  handleDelete() {
    Tasks.remove(this.props.task._id);
  }

  routeEdit(){
    const route1 = "/taskEdit/";
    const route2 = this.props.task._id;
    const route = route1.concat(route2);
    FlowRouter.go(route);
  }

  handleShare(){
    console.log('Not yet implemented!');
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
        <MenuItem onTouchTap={this.handleShare}>Share</MenuItem>
        <MenuItem onTouchTap={this.routeEdit}>Edit</MenuItem>
        <MenuItem onTouchTap={this.handleDelete}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <MuiThemeProvider>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText={this.props.task.taskName}
          secondaryText="More Information"
          rightIconButton={rightIconMenu}
        />
      </MuiThemeProvider>
    );
  }
}
