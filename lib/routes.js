import React from 'react';
import {mount} from 'react-mounter';

import Auth from '../imports/ui/components/Auth.jsx';
import App from '../imports/ui/components/App.jsx';

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    if (Meteor.userId()) {
      mount(App);
    } else {
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/auth', {
  name: 'auth',
  action: function(){
    if(Meteor.userId()) {
      FlowRouter.redirect('/');
    } else {
      mount(Auth);
    }
  }
});
