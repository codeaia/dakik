import React, {Component } from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import 'semantic-ui-css/semantic.min.css';

import TimerContainer from './Timer.jsx';
import StatisticsContainer from './Statistics.jsx';
import Settings from './Settings.jsx';
import About from './About.jsx';
import TaskNew from './TaskNew.jsx';
import Profile from './Profile.jsx';
import Auth from './Auth.jsx';
import NotFound from './NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/auth',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
);


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ createHistory() }>
        <div className="fullHeight">
          <div className="container fullHeight">
            <Switch>
              <PrivateRoute path="/" exact component={TimerContainer}/>
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute path="/settings/trello" component={Settings} />
              <PrivateRoute path="/settings/wunderlist" component={Settings} />
              <PrivateRoute path="/about" component={About} />
              <PrivateRoute path="/taskNew" component={TaskNew} />
              <AuthRoute path="/auth" component={Auth} />
              <PrivateRoute component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
