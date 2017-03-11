import React from 'react';
import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(() => {
  injectTapEventPlugin();

  Session.set('startNumber', 0);
  Session.set('endNumber', 5);

  Session.set({
    "route": "timer",
    "snackbarMessage": "error",
    "snackbar": false,
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
