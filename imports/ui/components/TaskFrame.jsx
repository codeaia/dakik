import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

export default class TaskFrame extends Component {

  constructor(props) {
    super(props);
    console.log('TaskFrame Loaded..');

  }

  render() {
    return (
      <h1>Placeholder</h1>

    );
  }

}
