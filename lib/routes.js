import React from 'react';
import {mount} from 'react-mounter';

import {mainLayout} from '../imports/ui/layouts/mainLayout.jsx';
import {homeLayout} from '../imports/ui/layouts/homeLayout.jsx';

import ActionsMenu from '../imports/ui/components/ActionsMenu.jsx';
import Counter from '../imports/ui/components/Counter.jsx';
import Nav from '../imports/ui/components/Nav.jsx';

import TagListButton from '../imports/ui/components/TagListButton.jsx';
import TagView from '../imports/ui/components/TagView.jsx';
import TagEdit from '../imports/ui/components/TagEdit.jsx';

import TaskDetail from '../imports/ui/components/TaskDetail.jsx';
import TaskEdit from '../imports/ui/components/TaskEdit.jsx';
import TaskFrame from '../imports/ui/components/TaskFrame.jsx';
import Tasks from '../imports/ui/components/Tasks.jsx';


import Login from '../imports/ui/components/Login.jsx';
import Register from '../imports/ui/components/Register.jsx';

import Err from '../imports/ui/components/Err.jsx';

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        nav: (<Nav />),
        counter: (<Counter />),
        taskFrame: (<TaskFrame />),
        actionsMenu: (<ActionsMenu />),
        tagListButton: (<TagListButton />)
      })
    } else {
      console.log('Not logged in, redirecting to login..');
		  FlowRouter.redirect('/login');
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
      console.log('Not logged in, redirecting to login..');
		  FlowRouter.redirect('/login');
    }
  }
});

FlowRouter.route('/tasks', {
  name: 'tasks',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        content: (<Tasks />)
      })
    } else {
      console.log('Not logged in, redirecting to login..');
		  FlowRouter.redirect('/login');
    }
  }
});

FlowRouter.route('/tagView', {
  name: 'tagView',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        content: (<TagView />)
      })
    } else {
      console.log('Not logged in, redirecting to login..');
		  FlowRouter.redirect('/login');
    }
  }
});

FlowRouter.route('/taskEdit', {
  name: 'taskEdit',
  action: function() {
    if (Meteor.userId()) {
      mount (mainLayout, {
        content: (<TaskEdit />)
      })
    } else {
      console.log('Not logged in, redirecting to login..');
		  FlowRouter.redirect('/login');
    }
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action: function(){
    if(Meteor.userId()) {
      console.log('Unauthorized move, redirecting to home..');
      FlowRouter.redirect('/');
    } else {
      mount (mainLayout, {
        content: (<Login />),
      })
    }
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action: function(){
    if(Meteor.userId()) {
      FlowRouter.redirect('/');
      console.log('Unauthorized move, redirecting to home..');
    } else {
      mount (mainLayout, {
        content: (<Register />),
      })
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
