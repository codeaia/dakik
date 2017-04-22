import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export const Pomos = new Mongo.Collection('pomos');

if (Meteor.isServer) {
  Meteor.methods({
    addPomo: function(){
      Pomos.insert({
        taskId: Meteor.user().profile.currentTaskId,
        finishDate: moment().format('DD/MM/YYYY'),
      });
    },
    deletePomo: function(taskId){
      if (Meteor.userId() && Meteor.userId() === Tasks.findOne(taskId).ownerId) {
        Pomos.remove({taskId: taskId});
      }
    }
  });

  Meteor.publish('pomos', function(taskId) {
    return Pomos.find({taskId: taskId});
  });
}
