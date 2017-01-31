import { Mongo } from 'meteor/mongo';

export const Tags = new Mongo.Collection('tags');

Tags.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.ownerId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.ownerId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});

if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('tags', function tasksPublication() {
    return Tags.find({ownerId: this.userId});
  });
}
