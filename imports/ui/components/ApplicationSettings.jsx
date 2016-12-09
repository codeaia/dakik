import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

export default class ApplicationSettings extends Component {

  constructor(props) {
    super(props);
    console.log('ApplicationSettings Loaded..');

  }

  render() {
    return (
      <h1>Placeholder</h1>

    );
  }

}
