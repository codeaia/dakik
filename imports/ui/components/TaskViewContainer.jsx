import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TaskView from './TaskView.jsx';

import { Tasks } from '../../api/tasks.js';

export default TaskViewContainer = createContainer(() => {
  const currentUser = Meteor.user();
  Meteor.subscribe('tasks');

  const tasks = Tasks.find().fetch();

  return {
    currentUser,
    tasks,
  };
}, TaskView);
