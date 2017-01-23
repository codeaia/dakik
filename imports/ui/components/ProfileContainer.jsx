import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Profile from './Profile.jsx';

export default ProfileContainer = createContainer(() => {
  const currentUser = Meteor.user();

  return {
    currentUser,
  };
}, Profile);
