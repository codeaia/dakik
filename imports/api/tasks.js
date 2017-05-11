import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.methods({
    addTask: function(name, priority, pomoGoal, integratedWith, dueDate){
      Tasks.insert({
        ownerId: Meteor.userId(),
        taskName: name,
        taskPriority: priority,
        pomoCount: 0,
        pomoGoal: pomoGoal,
        checked: false,
        integratedWith: integratedWith,
        dueDate: dueDate,
        createdAt: new Date(),
      });
    },
    editTask: function(id, name, priority, goal, dueDate){
      Tasks.update(id, {
        $set: {
          taskName: name,
          taskPriority: priority,
          pomoGoal: goal,
          dueDate: dueDate,
        }
      });
    },
    checkTask: function(id, state){
      Tasks.update(id, {
        $set: { checked: state}
      });
    },
    finishTask: function(){
      Tasks.update(Meteor.user().profile.currentTaskId, {$inc: {pomoCount: 1}});
      var task = Tasks.findOne(Meteor.user().profile.currentTaskId);
      if (task.pomoCount === task.pomoGoal) {
        Meteor.call('updateDate', 0, 1);
        Tasks.update(Meteor.user().profile.currentTaskId, {$set: {checked: true}});
      }
    },
    deleteTask: function(id){
      if (Meteor.userId() && Meteor.userId() === Tasks.findOne(id).ownerId) {
        Tasks.remove(id);
      }
    }
  });

  Meteor.publish('tasks', function(skip) {
    return Tasks.find({ownerId: this.userId}, {skip: skip, limit: 6, sort: { createdAt: -1 }});
  });

  Meteor.publish('allTasks', function() {
    return Tasks.find({ownerId: this.userId});
  });
}
