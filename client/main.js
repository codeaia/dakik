import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(() => {
  injectTapEventPlugin();

  Session.set({
    "snackbarMessage": "error",
    "snackbar": false
  });

  Session.set({
    "timerProgress": 0
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
