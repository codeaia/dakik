import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TaskView from './TaskView.jsx';

import { Tasks } from '../../api/tasks.js';

export default TaskViewContainer = createContainer(() => {
  Meteor.subscribe('tasks');
  const currentUser = Meteor.user();
  const tasks = Tasks.find().fetch();

  return {
    currentUser,
    tasks,
  };
}, TaskView);
