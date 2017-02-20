import React, { Component, constructor, State } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={ this.props.currentUser ? this.props.currentUser.username : 'error'}
            subtitle= { this.props.currentUser ? this.props.currentUser.emails[0].address : 'error'}
            avatar="/jsa-128.jpg"
            />
          <CardTitle title="İstatistiklerin"/>
          <CardText>
            Friends: 4<br/>
            Task Record: 2<br/>
            Tag Record: 3<br/>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}
