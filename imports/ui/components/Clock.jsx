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
    var temp = parseInt(this.props.elapsedTime, 10);
    return 25 - Math.floor(temp / 60);
  }

  getSeconds(){
    var temp = parseInt(this.props.elapsedTime, 10);
    return 60 - (temp - (25 - this.getMinutes()) * 60);
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
              size={350}
              thickness={7}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
