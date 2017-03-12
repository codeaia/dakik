import React, { Component, constructor} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Rsvg from 'react-inlinesvg';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Rsvg className = "loading" uniquifyIDs={false} src="icon1.svg"> </Rsvg>
    );
  }
}
