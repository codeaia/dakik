import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Noty from 'noty';

import App from '../imports/ui/components/App.jsx';

Meteor.startup(() => {
  injectTapEventPlugin();

  Session.set({
    "skip": 0,
  });

  render(<App />, document.getElementById('render-target'));

  Accounts.onLogin(function() {
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Logged In',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  });

  Accounts.onLogout(function() {
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Logged Out',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  });
});
