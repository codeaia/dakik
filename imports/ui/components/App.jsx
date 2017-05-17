import React, {Component } from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import 'semantic-ui-css/semantic.min.css';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import TimerContainer from './Timer.jsx';
import StatisticsContainer from './Statistics.jsx';
import Settings from './Settings.jsx';
import About from './About.jsx';
import TaskNew from './TaskNew.jsx';
import TaskDetailsContainer from './TaskDetails.jsx';
import TaskEdit from './TaskEdit.jsx';
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
    const userReducer = (state={}, action) => {
      switch (action.type) {
        case "CHANGE_NAME": {
          state = {...state, name: action.payload};
          break;
        }
        case "CHANGE_AGE": {
          state = {...state, age: action.payload};
          break;
        }
      }
      return state;
    }

    const tweetsReducer = (state=[], action) => {
      return state;
    }

    const reducers = combineReducers({
      user: userReducer,
      tweets: tweetsReducer
    });

    const store = createStore(reducers);
    store.subscribe(() => {
      console.log("store changed", store.getState());
    })

    store.dispatch({type: "CHANGE_NAME", payload: "Ahmet"});
    store.dispatch({type: "CHANGE_AGE", payload: 21});
    store.dispatch({type: "CHANGE_AGE", payload: 22});

    return (
      <Provider store={store}>
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
              <AuthRoute path="/auth" component={Auth} />
              <PrivateRoute component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
