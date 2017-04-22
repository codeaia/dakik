import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../imports/ui/components/App.jsx';

Meteor.startup(() => {
  injectTapEventPlugin();

  Session.set({
    "skip": 0,
  });

  render(<App />, document.getElementById('render-target'));

  Accounts.onLogin(function() {
    console.log('Signed In');
  });

  Accounts.onLogout(function() {
    console.log('Signed Out');
  });
});
