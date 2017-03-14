import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
import ReactCSSTransition from 'react-addons-css-transition-group';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { Tasks } from '../../api/tasks.js';

import Loading from './Loading.jsx';
import Clock from './Clock.jsx';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      elapsedTime: 0,
      elapsedAngle: 0,
    }

    this.getIconName = this.getIconName.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentDidMount(){
    var date = new Date();

    if (this.props.currentUser.profile.playing) {
      var timeDiff = (date.valueOf() - this.props.currentUser.profile.updateTime) / 1000;
    }else{
      var timeDiff = 0;
    }

    if ((timeDiff + this.props.currentUser.profile.elapsedTime) < 1500) {
      this.setState({
        playing: this.props.currentUser.profile.playing,
        elapsedTime: this.props.currentUser.profile.elapsedTime + timeDiff,
        elapsedAngle: this.props.currentUser.profile.elapsedTime / 15,
      });
    }else {
      // update the selected task and add 1 pomo time to it
    }

    if (this.state.playing) {
      this.timer = setTimeout(() => this.progress(), 1000);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentUser.profile.playing && !this.state.playing){
      this.setState({
        playing: true,
        elapsedTime: nextProps.currentUser.profile.elapsedTime,
      });
      this.timer = setTimeout(() => this.progress(), 1000);
    }
  }

  componentWillUnmount(){
    if (Meteor.user()) {
      var date = new Date();
      const newProfile = this.props.currentUser.profile;

      newProfile.playing = this.state.playing;
      newProfile.elapsedTime = this.state.elapsedTime;
      newProfile.updateTime = date.valueOf();

      Meteor.users.update({_id: this.props.currentUser._id},{$set: {profile: newProfile}});
    }

    if (this.state.playing) {
      this.state.playing = false;
    }
  }

  progress() {
    if (this.state.playing) {
      if (this.state.elapsedTime < 1500) {
        const temp = this.state.elapsedTime + 1;
        this.setState({
          elapsedTime: temp,
          elapsedAngle: temp / 15,
        });
        this.timer = setTimeout(() => this.progress(), 1000);
      } else if(this.state.elapsedTime >= 1500){
        this.handleStop();

        const taskId = this.props.currentUser.profile.currentTaskId;
        const temp = Tasks.findOne({_id: taskId});
        const totalPomos = temp.totalPomos + 1;

        Tasks.update({_id: taskId},{$set: {totalPomos}});

        const newProfile = this.props.currentUser.profile;
        if (newProfile.pomoCount !== undefined) {
          newProfile.pomoCount++;
        } else {
          newProfile.pomoCount = 1;
        }

        newProfile.startDisabled = false;

        Meteor.users.update({_id: this.props.currentUser._id},{$set: {profile: newProfile}});
      }
    }
  }

  handlePause() {
    if (this.state.playing) {
      this.setState({
        playing: false,
      });
      var date = new Date();
      const newProfile = this.props.currentUser.profile;

      newProfile.playing = false;
      newProfile.elapsedTime = this.state.elapsedTime;
      newProfile.updateTime = date.valueOf();

      Meteor.users.update({_id: this.props.currentUser._id},{$set: {profile: newProfile}});
    } else {
      this.setState({
        playing: true,
      });
      var date = new Date();
      const newProfile = this.props.currentUser.profile;

      newProfile.playing = true;
      newProfile.elapsedTime = this.state.elapsedTime;
      newProfile.updateTime = date.valueOf();

      Meteor.users.update({_id: this.props.currentUser._id},{$set: {profile: newProfile}});
      this.timer = setTimeout(() => this.progress(), 1000);
    }
  }

  handleStop() {
    this.setState({
      playing: false,
      elapsedTime: 0,
      elapsedAngle: 0
    });

    const newProfile = this.props.currentUser.profile;

    newProfile.startDisabled = false;
    newProfile.playing = false;
    newProfile.elapsedTime = 0;
    newProfile.updateTime = null;
    newProfile.currentTaskId = null;

    Meteor.users.update({_id: this.props.currentUser._id},{$set: {profile: newProfile}});
  }

  getIconName(){
    if(this.state.playing){
      return 'fa fa-pause';
    } else {
      return 'fa fa-play';
    }
  }

  render() {
    if (this.props.currentUser) {
      return (
        <MuiThemeProvider>
          <Flexbox flexDirection="column">
            <Clock playing={this.state.playing} elapsedTime={this.state.elapsedTime} elapsedAngle={this.state.elapsedAngle} />
            <Flexbox justifyContent="center">
              <FloatingActionButton style={{marginRight: "1em"}} iconClassName={this.getIconName()} onClick={this.handlePause}/>
              <FloatingActionButton disabled={!this.props.currentUser.profile.playing} iconClassName="fa fa-stop" onClick={this.handleStop}/>
            </Flexbox>
          </Flexbox>
        </MuiThemeProvider>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}
