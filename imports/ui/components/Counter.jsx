import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import ReactCountdownClock from "react-countdown-clock";

export default class Counter extends Component {

  constructor(props) {
    super(props);
    console.log('Counter Loaded..');
  }

  render() {
    return (
          <Flexbox className="timerCont">
            <ReactCountdownClock seconds={25*60} color="#000" alpha={0.5} size={350} font="freeSans" onComplete={function(){console.log("bitti");}} />
          </Flexbox>
    );
  }

}
