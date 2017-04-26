import { Meteor } from 'meteor/meteor';

import { Tasks } from '../imports/api/tasks.js';
import { Pomos } from '../imports/api/pomos.js';
import { Stats } from '../imports/api/stats.js';

Fiber = Npm.require('fibers');
Future = Npm.require('fibers/future');
OAuth = require('oauth').OAuth;
oauth = new OAuth(
  "https://trello.com/1/OAuthGetRequestToken",
  "https://trello.com/1/OAuthGetAccessToken",
  "22c8405407690bf15b6457a1c3bbcc33",
  "73334b92d5b14b031895c771e406a92278f4fd3b85f86e83948d409784606a13",
  "1.0A",
  "http://localhost:3000/settings",
  "HMAC-SHA1");

  Meteor.methods({
    fetchFromService: function(code) {
      var url = "https://www.wunderlist.com/oauth/access_token";
      var jsonObject = {"client_id": "bcddc2947c80dd050a3f",
      "client_secret": "92c21f6b822deb12fa06c6e7f15b65cbed5f20d67902bf97ae474645744e",
      "code": code};

      var result = Meteor.http.call('post', url, {data:jsonObject, header:{"Content-Type": "application/json; charset=UTF-8"}, timeout:30000});
      if(result.statusCode==200) {
        var respJson = JSON.parse(result.content);
        var temp = Meteor.user().profile;
        temp.wunderlistToken = respJson.access_token;
        Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
        return temp.wunderlistToken;
      } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    },
    takeTrelloOauthToken: function(url) {
      var oauth_secrets = [];
      var myFuture = new Future();
      var temp = Meteor.user().profile;
      oauth.getOAuthAccessToken(url.oauth_token, temp.tokenSecret, url.oauth_verifier, function(error, accessToken, accessTokenSecret, results){
        if(error){
          myFuture.throw(error);
        }else{
          oauth_secrets[0] = accessToken;
          oauth_secrets[1] = accessTokenSecret;
          myFuture.return(oauth_secrets);
        }
      });
      return myFuture.wait();
    },
    takeTrelloToken: function() {
      var oauth_secrets = [];
      var myFuture = new Future();
      oauth.getOAuthRequestToken(function(error, token, tokenSecret, results){
        if(error){
          myFuture.throw(error);
        }else{
          oauth_secrets[0] = token;
          oauth_secrets[1] = tokenSecret;
          myFuture.return(oauth_secrets);
        }
      });
      return myFuture.wait();
    },
    getInfo: function(id) {
      var temp = Meteor.user().profile;
      var myFuture = new Future();
      oauth.getProtectedResource("https://api.trello.com/1/boards/" + id + "/cards", "GET", temp.accessToken, temp.accessTokenSecret, function(error, data, response){
        if(error){
          myFuture.throw(error);
        }else{
          var respJson = JSON.parse(data);
          myFuture.return(respJson);
        }
      });
      return myFuture.wait();
    },
    getBoardsId: function() {
      var temp = Meteor.user().profile;
      var myFuture = new Future();
      oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", temp.accessToken, temp.accessTokenSecret, function(error, data, response){
        if(error){
          myFuture.throw(error);
        }else{
          var respJson = JSON.parse(data);
          myFuture.return(respJson.idBoards);
        }
      });
      return myFuture.wait();
    },
    fetchFromService2: function() {
      var url = "https://a.wunderlist.com/api/v1/lists";
      var result = Meteor.http.call('get', url, {params:{access_token: Meteor.user().profile.wunderlistToken,client_id:"bcddc2947c80dd050a3f"}, header:{"Content-Type": "application/json; charset=UTF-8"}, timeout:30000});
      if(result.statusCode==200) {
        var respJson = JSON.parse(result.content);
        return respJson;
      } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    },

    fetchFromService3: function(id) {
      var url = "https://a.wunderlist.com/api/v1/tasks";
      var result = Meteor.http.call('get', url, {params:{access_token: Meteor.user().profile.wunderlistToken,client_id:"bcddc2947c80dd050a3f",list_id:id}, header:{"Content-Type": "application/json; charset=UTF-8"}, timeout:30000});
      if(result.statusCode==200) {
        var respJson = JSON.parse(result.content);
        return respJson;
      } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    }
  });
