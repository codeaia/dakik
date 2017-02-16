import React, { Component, constructor, State } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
  }

  getMinutes(){
    var temp = 25 - Math.floor(parseInt(this.props.elapsedTime, 10) / 60);
    if (temp < 10) {
      return '0' + temp.toString();
    } else {
      return temp;
    }
  }

  getSeconds(){
    var minute = 25 - Math.floor(parseInt(this.props.elapsedTime, 10) / 60);
    var temp = parseInt(this.props.elapsedTime, 10);
    var seconds = 60 - (temp - (25 - minute) * 60);

    if (seconds < 10) {
      return '0' + seconds.toString();
    } else {
      return seconds;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="clock">
          <div className="clockText">
            {this.getMinutes()}:{this.getSeconds()}
          </div>
          <div className="circular">
            <CircularProgress
              color="white"
              mode="determinate"
              value={this.props.elapsedAngle}
              size={288}
              thickness={12}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
