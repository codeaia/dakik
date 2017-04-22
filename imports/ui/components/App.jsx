import React, {Component, constructor, State} from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import TimerContainer from './Timer.jsx';
import StatisticsContainer from './Statistics.jsx';
import Settings from './Settings.jsx';
import About from './About.jsx';
import TaskNew from './TaskNew.jsx';
import Profile from './Profile.jsx';
import Nav from './Nav.jsx';
import Auth from './Auth.jsx';

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


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ createHistory() }>
        <div className="fullHeight">
          <Nav/>
          <div className="container fullHeight">
            <Switch>
              <PrivateRoute path="/timer" component={TimerContainer} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute path="/about" component={About} />
              <PrivateRoute path="/taskNew" component={TaskNew} />
              <Route name="auth" path="/auth" component={Auth} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
