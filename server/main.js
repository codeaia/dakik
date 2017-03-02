import { Meteor } from 'meteor/meteor';

token = "";

Meteor.methods({
  fetchFromService: function(code) {
    var url = "https://www.wunderlist.com/oauth/access_token";
    var jsonObject = {"client_id": "e04ef6ffa3101a7ffe8e",
      "client_secret": "8b749c1f89dcf505eeacf4ed98580d994d60d1ac6ad025b77b7e54287ad2",
      "code": code};

    var result = Meteor.http.call('post', url, {data:jsonObject, header:{"Content-Type": "application/json; charset=UTF-8"}, timeout:30000});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      var accessToken = respJson.access_token;
      token = accessToken;
      return accessToken;
    } else {
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },

  fetchFromService2: function() {
    var url = "https://a.wunderlist.com/api/v1/lists";
    var result = Meteor.http.call('get', url, {params:{access_token: token,client_id:"e04ef6ffa3101a7ffe8e"}, header:{"Content-Type": "application/json; charset=UTF-8"}, timeout:30000});
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
    var result = Meteor.http.call('get', url, {params:{access_token: token,client_id:"e04ef6ffa3101a7ffe8e",list_id:id}, header:{"Content-Type": "application/json; charset=UTF-8"}, timeout:30000});
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
