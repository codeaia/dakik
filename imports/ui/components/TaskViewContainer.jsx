import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TaskView from './TaskView.jsx';

import { Tasks } from '../../api/tasks.js';

export default TaskViewContainer = createContainer(() => {
  const tasksHandle = Meteor.subscribe('tasks');
  const loading = !tasksHandle.ready();
  const tasks = Tasks.find();

  return {
    loading,
    tasks: !loading ? tasks.fetch() : [],
  };
}, TaskView);
