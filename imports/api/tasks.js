import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.methods({
    addTask: function(name, priority, pomoGoal, integratedWith, dueDate, details){
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
        details: details
      }); // Create new task
    },
    editTask: function(id, name, priority, goal, dueDate, details){
      Tasks.update(id, {
        $set: {
          taskName: name,
          taskPriority: priority,
          pomoGoal: goal,
          dueDate: dueDate,
          details: details,
        }
      }); // Edit task with given params.
    },
    finishTask: function(){
      var task = Tasks.findOne(Meteor.user().profile.currentTaskId);
      if ((task.pomoCount + 1) === task.pomoGoal) {
        Meteor.call('updateDate', 0, 1); // Save one finished task onto today's stats.
        Meteor.call('updateGoal', true);
        Tasks.update(Meteor.user().profile.currentTaskId, {$set: {checked: true, pomoCount: task.pomoCount + 1}}); // Check the task, increase pomo Count
      } else {
        Tasks.update(Meteor.user().profile.currentTaskId, {$set: {pomoCount: task.pomoCount + 1}}); // Increase pomo Count
      }
    },
    killTask: function(id){
      Meteor.call('updateDate', 0, 1); // Save one finished task onto today's stats.
      Tasks.update(id, {$set: {checked: true}}); // Check the task
      Meteor.call('updateGoal', false);
    },
    deleteTask: function(id){
      if (Meteor.userId() && Meteor.userId() === Tasks.findOne(id).ownerId) {
        Tasks.remove(id); // Delete task
      }
    }
  });

  Meteor.publish('tasks', function(skip) {
    return Tasks.find({ownerId: this.userId}, {skip: skip, limit: 11, sort: { createdAt: -1 }});
  });

  Meteor.publish('allTasks', function() {
    return Tasks.find({ownerId: this.userId});
  });
}
