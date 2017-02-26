import React, { Component, constructor, State } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText} from 'material-ui/Card';

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
      popup2: false,
    }

    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.updateSnackbarText = this.updateSnackbarText.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.openEditTask = this.openEditTask.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.closePopup2 = this.closePopup.bind(this);

    console.log(this.props.task);
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

  closePopup() {
    this.setState({
      popup: false
    });
  }

  closePopop2() {
    this.setState({
      popup: false
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

    const actions = [
      <FlatButton
        label="CANCEL"
        primary={true}
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label="EDIT"
        primary={true}
        onTouchTap={this.closePopup}
      />,
      <FlatButton
        label="START"
        primary={true}
        onTouchTap={this.closePopup}
      />,
    ];

    const actions2 = [
      <FlatButton
        label="CANCEL"
        primary={true}
        onTouchTap={this.closePopup2}
      />,
      <FlatButton
        label="SAVE"
        primary={true}
        onTouchTap={this.closePopup2}
      />,
    ];

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
          <Dialog
            title="TASK DETAILS"
            actions={actions}
            modal={false}
            open={this.state.popup}
            onRequestClose={this.closePopup}
            >
            <Card>
              <CardText>
                Task Name: {this.props.task.taskName} <br />
                Priority: {this.props.task.taskPriority} <br />
                Pomotime: {this.props.task.totalPomos} <br />
                Estimated Pomos: {this.props.task.taskGoal} <br />
                Due Date: {this.props.task.newDate.getDate()}-{this.props.task.newDate.getMonth()}-{this.props.task.newDate.getFullYear()}
              </CardText>
            </Card>
          </Dialog>
          <Dialog
            title="TASK EDIT"
            actions={actions2}
            modal={false}
            open={this.state.popup2}
            onRequestClose={this.closePopup2}
            >
          </Dialog>
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
