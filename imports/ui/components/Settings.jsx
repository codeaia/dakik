import React, { Component, constructor, State } from 'react';
import TrelloApi from './TrelloApi.jsx';
import WunderlistApi from './WunderlistApi.jsx';

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TrelloApi />
        <WunderlistApi />
      </div>
    );
  }
}
