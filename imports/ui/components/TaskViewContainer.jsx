import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TaskView from './TaskView.jsx';

import { Tasks } from '../../api/tasks.js';

export default ListPageContainer = createContainer(() => {
  const currentUser = Meteor.user();
  const tasks = Tasks.find({ownerId: Meteor.userId()}).fetch();
  
  return {
    currentUser,
    tasks,
  };
}, TaskView);
