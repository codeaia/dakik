import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import Loading from './Loading.jsx';

import { Tasks } from '../../api/tasks.js';
import Timer from './Timer.jsx';
import TaskViewContainer from './TaskViewContainer.jsx';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentUser !== undefined) {
      return (
        <Timer currentUser={this.props.currentUser}/>
      );
    } else {
      return (
        <Flexbox className="app">
          <Loading/>
        </Flexbox>
      );
    }
  }
}

Home.propTypes = {
  currentUser: React.PropTypes.object,
};

export default HomeContainer = createContainer(() => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, Home);
