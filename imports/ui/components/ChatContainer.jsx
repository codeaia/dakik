import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Chat from './Chat.jsx';

import { Chats } from '../../api/chats.js';

export default ChatContainer = createContainer(() => {
  const userId = Meteor.userId();
  const username = Meteor.users.find({_id: Meteor.userId()}).username;
  const chats = Chats.find({}).fetch();

  return {
    userId,
    username,
    chats,
  };
}, Chat);
