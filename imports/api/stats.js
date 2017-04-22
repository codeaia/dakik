import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export const Stats = new Mongo.Collection('stats');

if (Meteor.isServer) {
  Meteor.methods({
    newDate: function(){
      Stats.insert({
        ownerId: Meteor.userId(),
        date: moment().format('DD/MM/YYYY'),
        finishedPomoCount: 1,
        finishedTaskCount: 0,
      });
    },
    updateDate: function(finishedPomoCount, finishedTaskCount){
      Stats.update({ownerId: Meteor.userId(), date: moment().format('DD/MM/YYYY')}, {$inc: {finishedPomoCount: finishedPomoCount, finishedTaskCount: finishedTaskCount}});
    }
  });

  Meteor.publish('stats', function() {
    return Stats.find({ownerId: this.userId}, {limit: 30, sort: {createdAt: -1}});
  });

  Meteor.publish('dailyStat', function() {
    return Stats.find({ownerId: this.userId, date: moment().format('DD/MM/YYYY')});
  });
}
