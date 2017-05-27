import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export const Goals = new Mongo.Collection('goals');

if (Meteor.isServer) {
  Meteor.methods({
    updateGoal: function(hit, goal, finishedTasks){
      var count = 0;
      count = Goals.find({ownerId: Meteor.userId()}).count();
      if (count === 0) {
        Goals.insert({
          ownerId: Meteor.userId(),
          hitRate: 0,
          finishedTasks: 0
        });
      } else {
        if (hit) {
          Goals.update({ownerId: Meteor.userId()}, {$inc: {hitRate: 1, finishedTasks: 1}});
        } else {
          Goals.update({ownerId: Meteor.userId()}, {$inc: {finishedTasks: 1}});
        }
      }
    }
  });

  Meteor.publish('goals', function() {
    return Goals.find({ownerId: this.userId});
  });
}
