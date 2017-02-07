import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Timer from './Timer.jsx';

export default TimerContainer = createContainer(() => {
  const currentUser = Meteor.users.findOne({_id: Meteor.userId()});
  return {
    currentUser,
  };
}, Timer);
