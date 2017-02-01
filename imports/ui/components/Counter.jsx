import React, { Component, PropTypes, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export default class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(Session.get("timerProgress")), 500);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
      Session.set({
        "timerProgress": 0
      })
    } else {
      Session.set({
        "timerProgress": completed
      })
      this.setState({completed});
      this.timer = setTimeout(() => this.progress(completed + 1), 500);
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="clock">
          <div className="clockText">
            {Session.get("timerProgress")}
          </div>
          <div className="circular">
            <CircularProgress
              color="white"
              mode="determinate"
              value={this.state.completed}
              size={350}
              thickness={7}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}
