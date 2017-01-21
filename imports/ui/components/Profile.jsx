import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={ this.props.currentUser ? this.props.currentUser.username : 'error'}
            subtitle= { this.props.currentUser ? this.props.currentUser.emails[0].address : 'error'}
            avatar="assets/jsa-128.jpg"
            />
          <CardTitle title="İstatistiklerin"/>
        </Card>
      </MuiThemeProvider>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Profile);
