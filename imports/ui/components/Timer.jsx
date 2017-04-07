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
      r: 0,
      g: 125,
      b: 225,
    }

    this.getIconName = this.getIconName.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  setColor(){
    if (this.state.r === 255 && this.state.g === 0 && this.state.b < 255) {
      // red  to purple, increase blue
      this.setState({
        b: this.state.b+1,
      });
    } else if (this.state.r > 0 && this.state.g === 0 && this.state.b === 255) {
      // purple  to blue, reduce red
      this.setState({
        r: this.state.r-1,
      });
    } else if (this.state.r === 0 && this.state.g < 255 && this.state.b === 255) {
      // blue to cyan, increase green
      this.setState({
        g: this.state.g+1,
      });
    } else if (this.state.r === 0 && this.state.g === 255 && this.state.b > 0) {
      // cyan to green, reduce blue
      this.setState({
        b: this.state.b-1,
      });
    } else if (this.state.r < 255 && this.state.g === 255 && this.state.b === 0) {
      // green to yellow, increase red
      this.setState({
        r: this.state.r+1,
      });
    } else if (this.state.r === 255 && this.state.g > 0 && this.state.b === 0) {
      // yellow to red, reduce green
      this.setState({
        g: this.state.g-1,
      });
    }
  }

  componentDidMount(){
    var date = new Date();

    if (Meteor.user().profile.playing) {
      var timeDiff = (date.valueOf() - Meteor.user().profile.updateTime) / 1000;
    }else{
      var timeDiff = 0;
    }

    if ((timeDiff + Meteor.user().profile.elapsedTime) < 1500) {
      this.setState({
        playing: Meteor.user().profile.playing,
        elapsedTime: Meteor.user().profile.elapsedTime + timeDiff,
        elapsedAngle: Meteor.user().profile.elapsedTime / 15,
      });
    } else {
      // TODO: veri henüz gelmediginden, metod taskı bulamıyor, işlem yarıda kesiliyor.
      Meteor.call('finishTask', Meteor.user().profile.currentTaskId);
      this.handleStop();
    }

    if (this.state.playing) {
      this.timer = setTimeout(() => this.progress(), 100);
    }
  }

  componentWillReceiveProps(nextProps){
    if(Meteor.user().profile.playing && !this.state.playing){
      this.setState({
        playing: true,
        elapsedTime: Meteor.user().profile.elapsedTime,
      });
      this.timer = setTimeout(() => this.progress(), 100);
    }
  }

  componentWillUnmount(){
    if (Meteor.user()) {
      var temp = Meteor.user().profile;
      temp.playing = this.state.playing;
      temp.elapsedTime = this.state.elapsedTime;
      temp.updateTime = (new Date()).valueOf();
      Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
    }

    if (this.state.playing) {
      this.state.playing = false;
    }
  }

  progress() {
    if (this.state.playing) {
      if (this.state.elapsedTime < 1500) {
        const temp = this.state.elapsedTime + (1/10);
        this.setColor();
        this.setState({
          elapsedTime: temp,
          elapsedAngle: temp / 15,
        });
        this.timer = setTimeout(() => this.progress(), 100);
      } else if(this.state.elapsedTime >= 1500){
        Meteor.call('finishTask', Meteor.user().profile.currentTaskId);
        this.handleStop();
      }
    }
  }

  handlePause() {
    if (this.state.playing) {
      this.setState({
        playing: false,
      });
    } else {
      this.setState({
        playing: true,
      });
      this.timer = setTimeout(() => this.progress(), 100);
    }
  }

  handleStop() {
    this.setState({
      playing: false,
      elapsedTime: 0,
      elapsedAngle: 0,
      r: 0,
      g: 125,
      b: 225,
    });

    const newProfile = Meteor.user().profile;

    newProfile.playing = false;
    newProfile.elapsedTime = 0;
    newProfile.updateTime = null;
    newProfile.currentTaskId = null;

    Meteor.users.update(Meteor.userId(), {$set: {profile: newProfile}});
  }

  getIconName(){
    if(this.state.playing){
      return 'fa fa-pause';
    } else {
      return 'fa fa-play';
    }
  }

  render() {
    if (Meteor.user()) {
      return (
        <MuiThemeProvider>
          <Flexbox flexDirection="column">
            <Clock color={"rgb(" + this.state.r + ", " + this.state.g + ", " + this.state.b + ")"} elapsedTime={this.state.elapsedTime} elapsedAngle={this.state.elapsedAngle} />
            <Flexbox justifyContent="center">
              <FloatingActionButton style={{marginRight: "1em"}} iconClassName={this.getIconName()} onClick={this.handlePause} disabled={this.state.elapsedTime > 0 ? false : true}/>
              <FloatingActionButton disabled={!this.state.playing} iconClassName="fa fa-stop" onClick={this.handleStop}/>
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
