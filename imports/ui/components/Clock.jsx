import React, { Component, constructor, State } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
    this.drawMinutes = this.drawMinutes.bind(this);
    this.drawSeconds = this.drawSeconds.bind(this);
  }

  getMinutes(){
    var minutes = 25 - this.props.elapsedTime / 60;
    return parseInt(minutes);
  }

  getSeconds(){
    var seconds = (1500 - this.props.elapsedTime) % 60;
    return parseInt(seconds);
  }

  drawMinutes(){
    var temp = this.getMinutes();
    if (temp < 10) {
      return '0' + temp.toString();
    } else {
      return temp;
    }
  }

  drawSeconds(){
    var temp = this.getSeconds();
    if (temp < 10) {
      return '0' + temp.toString();
    } else {
      return temp;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="clock logo">
          <div className="circular">
            <CircularProgress
              color="white"
              mode="determinate"
              value={100 - this.props.elapsedAngle}
              size={288}
              thickness={12}
            />
          </div>
          <div className="clockText">
            {this.drawMinutes()}:{this.drawSeconds()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
