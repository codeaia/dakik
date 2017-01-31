import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');

Chats.allow({
  insert: function (userId, doc) {
    return (userId && doc.ownerId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.ownerId === userId;
  },
  remove: function (userId, doc) {
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});

if (Meteor.isServer) {
  Meteor.publish('chats', function tasksPublication() {
    return Chats.find({});
  });
}
