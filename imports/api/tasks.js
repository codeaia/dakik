import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  addTask: function(name, priority, goal, integratedWith, dueDate){
    Tasks.insert({
      ownerId: Meteor.userId(),
      taskName: name,
      taskPriority: priority,
      taskGoal: goal,
      totalPomos: 0,
      checked: false,
      integratedWith: integratedWith,
      dueDate: dueDate,
      createdAt: new Date(),
    });

    var temp = Meteor.user().profile;
    temp.statistics.taskCount++;
    temp.statistics.incompleteTasks++;
    switch (integratedWith) {
      case "trello":
        temp.statistics.trelloTasksCount++;
        break;
      case "wunderlist":
        temp.statistics.wunderlistTasksCount++;
        break;
    }
    temp.statistics.estimatedPomos += goal;
    Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
  },
  editTask: function(id, name, priority, goal, dueDate){
    Tasks.update(id, {
      $set: {
        taskName: name,
        taskPriority: priority,
        taskGoal: goal,
        dueDate: dueDate,
      }
    });
  },
  checkTask: function(id, state){
    Tasks.update(id, {
      $set: { checked: state},
    });

    var temp = Meteor.user().profile;
    if (state === false) {
      temp.statistics.incompleteTasks++;
    } else {
      temp.statistics.incompleteTasks--;
    }
    Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
  },
  finishTask: function(id){
    console.log(id);
    var tempTask = Tasks.findOne(id);
    console.log(tempTask);
    if (tempTask.totalPomos) {
      Tasks.update(id, {$inc: { totalPomos: 1}});
    } else {
      Tasks.update(id, {$set: { totalPomos: 1}});
    }

    var temp = Meteor.user().profile;
    temp.statistics.completedPomos++;
    Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
  },
  deleteTask: function(id){
    if (Meteor.userId() && Meteor.userId() === Tasks.findOne(id).ownerId) {
      Tasks.remove(id);
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('tasks', function(skip) {
    return Tasks.find({ownerId: this.userId}, {skip: skip, limit: 6});
  });
}
