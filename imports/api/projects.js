import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  Meteor.methods({
    addProject: function(){

    },
    editProject: function(){

    },
    removeProject: function(){

    },
    addMembertoProject: function(){

    },
    removeMemberFromProject: function(){

    },
    addTasktoProject: function(){

    },
    removeTaskfromProject: function(){

    },
  });

  Meteor.publish('projects', function() {
    return Projects.find();
  });
}
