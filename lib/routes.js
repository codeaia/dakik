import React from 'react';
import {mount} from 'react-mounter';

import {mainLayout} from '../imports/ui/layouts/mainLayout.jsx';

import ActionsMenu from '../imports/ui/components/ActionsMenu.jsx';
import Counter from '../imports/ui/components/Counter.jsx';
import Nav from '../imports/ui/components/Nav.jsx';

import TagView from '../imports/ui/components/TagView.jsx';
import TagEdit from '../imports/ui/components/TagEdit.jsx';

import TaskDetail from '../imports/ui/components/TaskDetail.jsx';
import TaskEdit from '../imports/ui/components/TaskEdit.jsx';
import TaskFrame from '../imports/ui/components/TaskFrame.jsx';
import TaskContainer from '../imports/ui/components/TaskContainer.jsx';

import Profile from '../imports/ui/components/Profile.jsx';
import AccountSettings from '../imports/ui/components/AccountSettings.jsx';
import ApplicationSettings from '../imports/ui/components/ApplicationSettings.jsx';

import Auth from '../imports/ui/components/Auth.jsx';
import Stats from '../imports/ui/components/Stats.jsx';
import Home from '../imports/ui/components/Home.jsx';

import Err from '../imports/ui/components/Err.jsx';

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        content: (<Home />),
        nav: (<Nav />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/tagEdit', {
  name: 'tagEdit',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        content: (<TagEdit />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/tasks', {
  name: 'tasks',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        content: (<TaskContainer />),
        nav: (<Nav />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/tag/:tagName', {
  name: 'tagView',
  action: function(params) {
    if (Meteor.userId()) {
      mount (mainLayout, {
        nav: (<Nav />),
        content: (<TagView tagName={params.tagName} totalPomos='78' />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/taskEdit', {
  name: 'taskEdit',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        nav: (<Nav />),
        content: (<TaskEdit />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/auth', {
  name: 'auth',
  action: function(){
    if(Meteor.userId()) {
      console.log('Unauthorized move, redirecting to home..');
      FlowRouter.redirect('/');
    } else {
      mount (mainLayout, {
        content: (<Auth />),
      })
    }
  }
});

FlowRouter.route('/stats', {
  name: 'stats',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        nav: (<Nav />),
        content: (<Stats />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/profile', {
  name: 'profile',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        nav: (<Nav />),
        content: (<Profile />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/accSettings', {
  name: 'accSettings',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        nav: (<Nav />),
        content: (<AccountSettings />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.route('/appSettings', {
  name: 'appSettings',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        nav: (<Nav />),
        content: (<ApplicationSettings />)
      })
    } else {
      console.log('Not logged in, redirecting to auth..');
		  FlowRouter.redirect('/auth');
    }
  }
});

FlowRouter.notFound = {
  	name: '404',
    action: function() {
  		mount (mainLayout, {
        content: (<Err />)
      })
    }
};
