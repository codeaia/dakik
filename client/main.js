import React from 'react';
import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as V from 'victory';

Meteor.startup(() => {
  injectTapEventPlugin();

  Session.set({
    "route": "timer",
    "snackbarMessage": "error",
    "snackbar": false,
    "skip": 0,
  });

  Accounts.onLogin(function() {
    Session.set({
      "snackbarMessage": "Logged In",
      "snackbar": true
    });
    Meteor.setTimeout(function(){
      Session.set({
        "snackbar": false
      });
    },4000);
  });

  Accounts.onLogout(function() {
    Session.set({
      "snackbarMessage": "Logged Out",
      "snackbar": true
    });
    Meteor.setTimeout(function(){
      Session.set({
        "snackbar": false
      });
    },4000);
  });
});
