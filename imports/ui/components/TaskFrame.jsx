import React, { Component, constructor, State } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import { Tasks } from '../../api/tasks.js';

export default class TaskFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbar: false,
      message: 'error',
      checked: false,
    }

    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.updateSnackbarText = this.updateSnackbarText.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.routeEdit = this.routeEdit.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount(){
    this.setState({
      checked: this.props.task.checked,
    });
  }

  updateSnackbarText(value){
    this.setState({
      message: value
    });
  }

  openSnackbar(){
    this.setState({
      snackbar: true,
    });
  }

  closeSnackbar(){
    this.setState({
      snackbar: false,
    });
  }

  toggleChecked() {
    this.setState({
      checked: !this.state.checked
    });

    Tasks.update(this.props.task._id, {
      $set: { checked: !this.state.checked },
    });
  }

  handleDelete() {
    this.updateSnackbarText('Task deleted');
    this.openSnackbar();
    Tasks.remove(this.props.task._id);
  }

  routeEdit(){
    const route1 = "/taskEdit/";
    const route2 = this.props.task._id;
    const route = route1.concat(route2);
    FlowRouter.go(route);
  }

  handleShare(){
    this.updateSnackbarText('Not yet implemented');
    this.openSnackbar();
  }

  getStatus(){
    if (this.state.checked) {
      return 'line-through';
    }
  }

  render() {
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="Options"
        tooltipPosition="bottom-left"
        iconClassName="fa fa-ellipsis-v"
      />
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.handleShare}>Share</MenuItem>
        <MenuItem onTouchTap={this.routeEdit}>Edit</MenuItem>
        <MenuItem onTouchTap={this.handleDelete}>Delete</MenuItem>
      </IconMenu>
    );

    const leftCheckbox = (
      <Checkbox
        checked={this.state.checked}
        onCheck={this.toggleChecked}
      />
    );

    return (
      <MuiThemeProvider>
        <div>
          <ListItem
            leftCheckbox={leftCheckbox}
            primaryText={this.props.task.taskName}
            rightIconButton={rightIconMenu}
            style={{
              textDecoration: this.getStatus()
            }}
          />
          <Snackbar
            open={this.state.snackbar}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.closeSnackbar}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
