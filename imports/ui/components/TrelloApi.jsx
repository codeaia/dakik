import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import WunderlistApi from './WunderlistApi.jsx';
import { Tasks } from '../../api/tasks.js';

export default class TrelloApi extends Component {
  constructor(props) {
    super(props);

    this.connectToTrello = this.connectToTrello.bind(this);
    this.exitFromTrello = this.exitFromTrello.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleDisabled2 = this.handleDisabled2.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);

    Trello.authorize({
      interactive:false,
    });

    var isLoggedIn = Trello.authorized();
    if(isLoggedIn) {
      this.state = {
        disabled: true,
        disabled2: false
      }
    } else {
      this.state = {
        disabled: false,
        disabled2: true
      }
    }

    Trello.authorize({
      interactive:false
    });
  }

  connectToTrello(){
    Trello.authorize({
      name: "PROJECT",
      type: "popup"
    })

    this.handleDisabled();
    this.handleDisabled2();
  }

  updateLogin() {
    var isLoggedIn = Trello.authorized();
    $(".exit").toggle(isLoggedIn);
    $(".connect").toggle(!isLoggedIn);
  }

  exitFromTrello() {
    Trello.deauthorize();
    this.handleDisabled2();
    this.handleDisabled();
  }

  addToDatabase() {
    Trello.members.get("me", function(member){
      Trello.get("/member/me/boards", function(boards) {
        for(i=0;i<boards.length;i++) {
          Trello.get('/boards/' + boards[i].id + '/lists', function(lists) {
            for(x=0;x<lists.length;x++) {
              Trello.get('/lists/' + lists[x].id + '/cards', function(cards) {
                for(y=0;y<cards.length;y++) {
                  Meteor.call(
                    'addTask',
                    cards[y].name,
                    0,
                    1,
                    "trello",
                    null,
                  );
                }
              });
            }
          });
        }
      });
    });
  }

  handleDisabled() {
    if (this.refs.myRef) {
      this.setState({disabled: !this.state.disabled});
    }
  }

  handleDisabled2() {
    if (this.refs.myRef) {
      this.setState({disabled2: !this.state.disabled2});
    }
  }

  render() {
    return (
      <MuiThemeProvider ref="myRef">
        <div>
          <FlatButton disabled={this.state.disabled} className="connect" label="Connect to Trello" onTouchTap={this.connectToTrello}/>
          <FlatButton disabled={this.state.disabled2} className="exit" label="Disconnect from Trello" onTouchTap={this.exitFromTrello}/>
          <FlatButton label="Sync" onTouchTap={this.addToDatabase}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
