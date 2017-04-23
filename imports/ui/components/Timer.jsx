import React, { Component, constructor } from 'react';
import Flexbox from 'flexbox-react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';

import { Tasks } from '../../api/tasks.js';
import { Pomos } from '../../api/pomos.js';
import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import Clock from './Clock.jsx';
import TaskViewContainer from './TaskView.jsx';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      elapsedTime: 0,
      elapsedAngle: 0,
      r: 0,
      g: 125,
      b: 255,
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
    var timeDiff = 0;
    if (Meteor.user()) {
      if (Meteor.user().profile.playing) {
        var timeDiff = (date.valueOf() - Meteor.user().profile.updateTime) / 1000;
      }
      if ((timeDiff + Meteor.user().profile.elapsedTime) < 1500) {
        this.setState({
          playing: Meteor.user().profile.playing,
          elapsedTime: Meteor.user().profile.elapsedTime + timeDiff,
          elapsedAngle: Meteor.user().profile.elapsedTime / 15,
        });
        this.timer = setTimeout(() => this.progress(), 100);
      } else {
        if (this.props.dailyStat) {
          Meteor.call('updateDate', 1, 0);
        } else {
          Meteor.call('newDate');
        }
        Meteor.call('finishTask');
        Meteor.call('addPomo');
        this.handleStop();
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user !== this.props.user && nextProps.user.profile.playing){
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
        if (this.props.dailyStat) {
          Meteor.call('updateDate', 1, 0);
        } else {
          Meteor.call('newDate');
        }
        Meteor.call('finishTask');
        Meteor.call('addPomo');
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
      b: 255,
    });

    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.playing": false,
      "profile.elapsedTime": 0,
      "profile.updateTime": 0,
      "profile.currentTaskId": null,
    }});
  }

  getIconName(){
    if(this.state.playing){
      return 'fa fa-pause';
    } else {
      return 'fa fa-play';
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox flexDirection="column">
          <Clock color={"rgb(" + this.state.r + ", " + this.state.g + ", " + this.state.b + ")"} elapsedTime={this.state.elapsedTime} elapsedAngle={this.state.elapsedAngle} />
          <div className="timerActionButtonContainer">
            <IconButton
              className="margin-right play"
              iconClassName={this.getIconName()}
              disabled={this.state.elapsedTime > 0 ? false : true}
              tooltip="Play/Pause"
              onClick={this.handlePause}
            />
            <IconButton
              className = "margin-left stop"
              iconClassName="fa fa-stop"
              disabled={!this.state.playing}
              tooltip="Play/Pause"
              onClick={this.handleStop}
            />
          </div>
          <TaskViewContainer />
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}

export default TimerContainer = createContainer(() => {
  Meteor.subscribe('dailyStat');
  const dailyStat = Stats.findOne();
  const user = Meteor.user();

  return {
    user,
    dailyStat,
  };
}, Timer);
