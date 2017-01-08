import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    console.log('Profile Loaded..');
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title="Ahmet Kaşif"
            subtitle="Developer"
            avatar="assets/jsa-128.jpg"
            />
          <CardTitle title="İstatistiklerin"/>
        </Card>
      </MuiThemeProvider>
    );
  }

}
