import React, { Component, constructor} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <CircularProgress color="white" size={80} thickness={5} />
      </MuiThemeProvider>
    );
  }
}
