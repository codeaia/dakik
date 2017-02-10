import React, { Component, PropTypes, constructor, State } from 'react';
import Flexbox from 'flexbox-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Loading from './Loading.jsx';
import Clock from './Clock.jsx';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      currentUser: null,
      elapsedTime: 1,
      elapsedAngle: 0,
    }

    this.toggleClock = this.toggleClock.bind(this);
    this.getIconName = this.getIconName.bind(this);
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

    this.setState({
      currentUser: this.props.currentUser,
    });

    if (this.state.playing) {
      this.timer = setTimeout(() => this.progress(), 1000);
    }
  }

  componentWillUnmount(){
    if (Meteor.user()) {
      var date = new Date();
      const newProfile = this.state.currentUser.profile;

      newProfile.playing = this.state.playing;
      newProfile.elapsedTime = this.state.elapsedTime;
      newProfile.updateTime = date.valueOf();

      Meteor.users.update({_id: this.state.currentUser._id},{$set: {profile: newProfile}});
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
      } else {
        this.setState({
          playing: false,
        });
        console.log('timer stopped!');
      }
    }
  }

  toggleClock(){
    if (this.state.playing) {
      this.setState({
        playing: false,
      });

      if (Meteor.user()) {
        var date = new Date();
        const newProfile = this.state.currentUser.profile;

        newProfile.playing = false;
        newProfile.elapsedTime = this.state.elapsedTime;
        newProfile.updateTime = date.valueOf();

        Meteor.users.update({_id: this.state.currentUser._id},{$set: {profile: newProfile}});
      }
    }else {
      this.setState({
        playing: true,
      });

      if (Meteor.user()) {
        var date = new Date();
        const newProfile = this.state.currentUser.profile;

        newProfile.playing = true;
        newProfile.elapsedTime = this.state.elapsedTime;
        newProfile.updateTime = date.valueOf();

        Meteor.users.update({_id: this.state.currentUser._id},{$set: {profile: newProfile}});
      }

      this.timer = setTimeout(() => this.progress(), 1000);
    }
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
              <FloatingActionButton iconClassName={this.getIconName()} onClick={this.toggleClock}/>
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
