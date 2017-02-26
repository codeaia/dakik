import React from 'react';
import {mount} from 'react-mounter';

import Auth from '../imports/ui/components/Auth.jsx';
import App from '../imports/ui/components/App.jsx';
import Err from '../imports/ui/components/Err.jsx';

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

FlowRouter.notFound = {
  	name: '404',
    action: function() {
  		mount(Err);
    }
};
