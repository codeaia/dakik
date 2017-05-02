import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h3 className="circular">Route '{this.props.location.pathname}' is not defined.</h3>
    );
  }
}
