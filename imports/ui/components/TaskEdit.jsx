import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class TaskEdit extends Component {

  constructor(props) {
    super(props);
    console.log('Task Edit Loaded..');
  }

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox className="content" flexDirection="row" justifyContent="center">
          <Flexbox className="col1">
          </Flexbox>

          <Flexbox className="col2">
          </Flexbox>

          <Flexbox className="col3">
          </Flexbox>
        </Flexbox>
      </MuiThemeProvider>
    );
  }

}
