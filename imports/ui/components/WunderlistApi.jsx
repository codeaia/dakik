import React, { Component, constructor} from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class WunderlistApi extends Component {
  constructor(props) {
    super(props);

    this.takeToken = this.takeToken.bind(this);
    this.userDetails = this.userDetails.bind(this);
    this.example = this.example.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleDisabled2 = this.handleDisabled2.bind(this);

    var location = window.location.href;
    var pathanddomain = location.split('&');
    var path = pathanddomain.splice(1, pathanddomain.length-1);
    if(path[0]==undefined) {
      code="";
    } else {
      var codeSegment = path[0];
      var checkValue = codeSegment.charAt(codeSegment.length-1);
      if(checkValue=='#') {
        var code = codeSegment.substring(5,codeSegment.length-1);
      } else {
        var code = codeSegment.substring(5,codeSegment.length);
      }

    }

    if(code=="") {
      this.state = {
        disabled: false,
        disabled2: true
      }
    } else {
      this.state = {
        disabled: true,
        disabled2: false
      }
    }

  }

  takeToken() {
    this.handleDisabled2();
    var location = window.location.href;
    var pathanddomain = location.split('&');
    var path = pathanddomain.splice(1, pathanddomain.length-1);
    var codeSegment = path[0];

    var checkValue = codeSegment.charAt(codeSegment.length-1);
    if(checkValue=='#') {
      var code = codeSegment.substring(5,codeSegment.length-1);
    } else {
      var code = codeSegment.substring(5,codeSegment.length);
    }

    Meteor.call('fetchFromService', code, function(err, respJson) {
      if(err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log(respJson);
      }
    });

    this.handleDisabled();
  }

  userDetails() {
    Meteor.call('fetchFromService2', function(err, respJson) {
      if(err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log(respJson);
      }
    });
  }

  handleDisabled() {
    this.setState({disabled: !this.state.disabled});
  }

  handleDisabled2() {
    this.setState({disabled2: !this.state.disabled2});
  }

  example() {
    this.handleDisabled();
    window.location.href = "https://www.wunderlist.com/oauth/authorize?client_id=e04ef6ffa3101a7ffe8e&redirect_uri=http://localhost:3000/integrations&state=RANDOM";
    this.handleDisabled2();
  }

  render() {
    return (
      <div>
        <FlatButton disabled={this.state.disabled} label="Authorize Yourself" onTouchTap={this.example}/>
        <FlatButton disabled={this.state.disabled2} label="Connect to Wunderlist" onTouchTap={this.takeToken}/>
        <FlatButton label="User Details" onTouchTap={this.userDetails}/>
      </div>
    );
  }
}
