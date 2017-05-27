import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';
import Noty from 'noty';
import { Button, Icon } from 'semantic-ui-react';

import { Tasks } from '../../api/tasks.js';
import { Pomos } from '../../api/pomos.js';
import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import Nav from './Nav.jsx';
import Clock from './Clock.jsx';
import TaskViewContainer from './TaskView.jsx';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      rTime: 1500,
      rAngle: 100,
      r: 0,
      g: 75,
      b: 255,
    }

    this.forceStop = this.forceStop.bind(this);
    this.handleStop = this.handleStop.bind(this);
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
    if (Meteor.user()) {
      if (Meteor.user().profile.currentTaskId) {
        this.setState({
          rTime: (Meteor.user().profile.timerDue - ((new Date()).valueOf() / 1000)),
          rAngle: (Meteor.user().profile.timerDue - ((new Date()).valueOf() / 1000)) / 15,
        });
        Session.set({"timer": Meteor.setTimeout(() => this.progress(), 100)});
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user !== this.props.user && nextProps.user.profile.currentTaskId){
      this.setState({
        playing: true,
        rTime: (Meteor.user().profile.timerDue - ((new Date()).valueOf() / 1000)),
        rAngle: (Meteor.user().profile.timerDue - ((new Date()).valueOf() / 1000)) / 15,
      });
      Meteor.clearTimeout(Session.get("timer"));
      Session.set({"timer": Meteor.setTimeout(() => this.progress(), 100)});
    }
  }

  componentWillUnmount(){
    this.setState({
      playing: false,
    });
    Meteor.clearTimeout(Session.get("timer"));
  }

  progress() {
    if (this.state.playing) {
      if (this.state.rTime > 0) {
        this.setColor();
        this.setState({
          rTime: this.state.rTime - (1 / 10),
          rAngle: (this.state.rTime - (1 / 10)) / 15,
        });
        Meteor.clearTimeout(Session.get("timer"));
        Session.set({"timer": Meteor.setTimeout(() => this.progress(), 100)});
      } else {
        if (this.props.dailyStat) {
          Meteor.call('updateDate', 1, 0);
        } else {
          Meteor.call('newDate');
        }
        Meteor.call('finishTask');
        Meteor.call('addPomo');
        this.handleStop();
        new Noty({
          type: 'success',
          layout: 'topRight',
          theme: 'sunset',
          text: 'Time is up, give a break',
          progressBar: true,
          closeWith: ['click', 'button'],
          animation: {
            open: 'noty_effects_open',
            close: 'noty_effects_close'
          }
        }).show();
      }
    }
  }

  startBreak(){
    this.handleStop();
    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.timerDue": ((new Date()).valueOf() / 1000) + 300,
    }});
  }

  handleStop() {
    this.setState({
      playing: false,
      rTime: 1500,
      rAngle: 100,
      r: 255,
      g: 0,
      b: 55,
    });

    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.timerDue": null,
      "profile.currentTaskId": null,
    }});
  }

  forceStop(){
    this.handleStop();
    new Noty({
      type: 'error',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Progress halted, timer stopped!',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  }

  render() {
    if (this.props.user) {
      return (
        <Flexbox flexDirection="column">
          <Nav history={this.props.history} location={this.props.location} />
          <Clock color={"rgb(" + this.state.r + ", " + this.state.g + ", " + this.state.b + ")"} remainingTime={this.state.rTime} remainingAngle={this.state.rAngle} />
          <Button
            icon={<Icon as='span' className='fa fa-stop' />}
            content='Stop'
            labelPosition='left'
            color={this.props.user.profile.currentTaskId ? 'red' : 'grey'}
            disabled={this.props.user.profile.currentTaskId ? false : true}
            className="stop animated fadeIn"
            onClick={() => this.forceStop()}
          />
          <TaskViewContainer history={this.props.history} location={this.props.location}/>
        </Flexbox>
      );
    } else {
      return (
        <Loading />
      );
    }
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
