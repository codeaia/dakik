import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';
var bar;
export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
    this.drawMinutes = this.drawMinutes.bind(this);
    this.drawSeconds = this.drawSeconds.bind(this);
  }

  componentDidMount(){
    bar = new ProgressBar.Circle(clockRef, {
      color: '#075341',
      trailColor: '#ffffff',
      trailWidth: 1,
      duration: 1500,
      easing: 'bounce',
      text:{
        value: this.drawMinutes() + ':' + this.drawSeconds()
      },
      strokeWidth: 2,
      from: {color: '#FFEA82', a:0},
      to: {color: '#d46356', a:1},
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
      }
    });
    bar.animate(this.props.remainingAngle / 100);
  }

  componentWillReceiveProps(nextProps){
    bar.set(this.props.remainingAngle / 100);
    bar.setText(this.drawMinutes() + ':' + this.drawSeconds());
  }

  getMinutes(){
    return parseInt(this.props.remainingTime / 60);
  }

  getSeconds(){
    return parseInt(this.props.remainingTime % 60);
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
      <div className="clock">
        <div className="circular">
          <div id='clockRef'></div>
        </div>
        <div className="clockLogo">
          <img src="dakik_logo.svg" alt=""/>
        </div>
      </div>
    );
  }
}
