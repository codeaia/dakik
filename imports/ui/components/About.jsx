import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import ChatContainer from './ChatContainer.jsx';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox flexDirection="column">
          <h1>About Page</h1>
          <Card>
            <CardHeader
              title = "Aim"
            />
            <CardText>
              Our aim is to produce a self-control application for people which should be also fun to use.
            </CardText>
          </Card>
          <Card>
            <CardHeader
              title = "Features"
            />
            <CardText>
              Coming soon..
            </CardText>
          </Card>

          <Card>
            <CardHeader
              title = "Known Issues"
            />
            <CardText>
              Coming soon..
            </CardText>
          </Card>
          <ChatContainer/>
        </Flexbox>
      </MuiThemeProvider>
    );
  }

}
