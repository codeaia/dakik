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
      popup: false,
      popupEdit: false,
    }

    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.updateSnackbarText = this.updateSnackbarText.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.openEditTask = this.openEditTask.bind(this);
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

  openPopup(){
    this.setState({
      popup: true
    });
  }

  openEditTask(){
    this.setState({
      popup: false,
      popupEdit: true
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
            rightIconButton={<IconButton iconClassName="fa fa-wrench" style={{padding: '-12px'}} onClick={this.openPopup} tooltip="Settings"/>
            }
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
