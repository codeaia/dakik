import React, { Component } from 'react';
import Rsvg from 'react-inlinesvg';

export default class Loading extends Component {
  render() {
    return (
      <Rsvg className="loading" uniquifyIDs={false} src="loading.svg"> </Rsvg>
    );
  }
}
