import React, { Component, PropTypes, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import WunderlistApi from './WunderlistApi.jsx';

import { Tasks } from '../../api/tasks.js';

export default class IntegrationAuth extends Component {
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
        disabled2: false,
        allTasks: [],
        equal: true
      }
    } else {
      this.state = {
        disabled: false,
        disabled2: true,
        allTasks: [],
        equal: true
      }
    }

    Trello.authorize({
      interactive:false
    });

    this.state.allTasks = this.props.tasks;
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
    const ownerId = this.props.currentUser._id;
    const checked = false;
    const taskPriority = 0;
    const totalPomos = 0;
    const taskGoal = 0;
    const integratedWith = "trello";
    const dueDate = null;
    const createdAt = new Date();
    var self = this;

    Trello.members.get("me", function(member){
      Trello.get("/member/me/boards", function(boards) {
        for(i=0;i<boards.length;i++) {
          Trello.get('/boards/' + boards[i].id + '/lists', function(lists) {
            for(x=0;x<lists.length;x++) {
              Trello.get('/lists/' + lists[x].id + '/cards', function(cards) {
                for(y=0;y<cards.length;y++) {
                  const taskName = cards[y].name;

                  if(self.state.allTasks[0] == null) {
                    Tasks.insert({
                      ownerId,
                      taskName,
                      taskPriority,
                      checked,
                      totalPomos,
                      taskGoal,
                      integratedWith,
                      dueDate,
                      createdAt,
                    });
                    self.state.allTasks[0] = new Object;
                    self.state.allTasks[0].taskName = taskName;
                    self.state.allTasks[0].ownerId = ownerId;
                    self.state.allTasks[0].taskPriority = 0;
                    self.state.allTasks[0].checked = false;
                    self.state.allTasks[0].totalPomos = 0;
                    self.state.allTasks[0].taskGoal = 0;
                    self.state.allTasks[0].integratedWith = integratedWith;
                    self.state.allTasks[0].dueDate = dueDate;
                    self.state.allTasks[0].createdAt = new Date();

                    equal = false;
                  } else {
                    for(z=0;z<self.state.allTasks.length;z++) {
                      if(cards[y].name == self.state.allTasks[z].taskName) {
                        equal = false;
                      }
                    }
                  }

                  if(equal) {
                    Tasks.insert({
                      ownerId,
                      taskName,
                      taskPriority,
                      checked,
                      totalPomos,
                      taskGoal,
                      integratedWith,
                      dueDate,
                      createdAt,
                    });
                    self.state.allTasks[self.state.allTasks.length] = new Object;
                    self.state.allTasks[self.state.allTasks.length-1].taskName = taskName;
                    self.state.allTasks[self.state.allTasks.length-1].ownerId = ownerId;
                    self.state.allTasks[self.state.allTasks.length-1].taskPriority = 0;
                    self.state.allTasks[self.state.allTasks.length-1].checked = false;
                    self.state.allTasks[self.state.allTasks.length-1].totalPomos = 0;
                    self.state.allTasks[self.state.allTasks.length-1].taskGoal = 0;
                    self.state.allTasks[self.state.allTasks.length-1].integratedWith = integratedWith;
                    self.state.allTasks[self.state.allTasks.length-1].dueDate = dueDate;
                    self.state.allTasks[self.state.allTasks.length-1].createdAt = new Date();
                  }
                  equal = true;
                }
              });
            }
          });//Trello.get ++ lists
        }
      });//Trello.get ++ boards
    });//Trello.get ++ name
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
        <Flexbox flexDirection="column">
          <Tabs>
            <Tab label="Trello">
              <FlatButton disabled={this.state.disabled} className="connect" label="Connect to Trello" onTouchTap={this.connectToTrello}/>
              <FlatButton disabled={this.state.disabled2} className="exit" label="Disconnect from Trello" onTouchTap={this.exitFromTrello}/>
              <FlatButton label="Sync" onTouchTap={this.addToDatabase}/>
            </Tab>
            <Tab label="Wunderlist">
              <div>
                <WunderlistApi currentUser={this.props.currentUser} tasks={this.props.tasks}/>
              </div>
            </Tab>
          </Tabs>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}
