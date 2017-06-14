import React, {Component } from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import 'semantic-ui-css/semantic.min.css';

import TimerContainer from './Timer.jsx';
import StatisticsContainer from './Statistics.jsx';
import Settings from './Settings.jsx';
import About from './About.jsx';
import TaskNew from './TaskNew.jsx';
import TaskDetailsContainer from './TaskDetails.jsx';
import TaskEdit from './TaskEdit.jsx';
import Profile from './Profile.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import NotFound from './NotFound';
import Nav from './Nav';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <DefaultLayout {...rest} component={matchProps => (
        <Component {...matchProps} />
      )} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Nav {...matchProps} />
        <Component {...matchProps} />
      </div>
    )} />
  )
};

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
          <Switch>
            <PrivateRoute path="/" exact component={TimerContainer}/>
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/settings/account" component={Settings} />
            <PrivateRoute path="/settings/trello" component={Settings} />
            <PrivateRoute path="/settings/wunderlist" component={Settings} />
            <PrivateRoute path="/about" component={About} />
            <PrivateRoute path="/about/features" component={About} />
            <PrivateRoute path="/about/changelog" component={About} />
            <PrivateRoute path="/about/licence" component={About} />
            <PrivateRoute path="/taskNew" component={TaskNew} />
            <PrivateRoute path="/taskEdit" component={TaskEdit} />
            <PrivateRoute path="/taskDetails" component={TaskDetailsContainer} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
