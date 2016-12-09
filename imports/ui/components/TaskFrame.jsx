import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';

export default class TaskFrame extends Component {

  constructor(props) {
    super(props);
    console.log('TaskFrame Loaded..');

    props = {
      tagName: '',
      color: '',
      totalPomos: '',
      selected: ''
    };
  }

  render() {
    return (
      <Flexbox className="taskFrame">
        <Flexbox className="taskFrameTop">
          <Flexbox>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <Checkbox className = "taskName" label={this.props.taskName}/>
            </MuiThemeProvider>
          </Flexbox>
          <p className = "totalPomos">{this.props.totalPomos}</p>
        </Flexbox>
        <Flexbox className="taskFrameBottom">
        </Flexbox>
      </Flexbox>
    );
  }

}
