import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import ChatContainer from './ChatContainer.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';

const styles = {
  headline: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 400,
    backgroundColor: '#FFFFFF',
  },
  background: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
};

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox flexDirection="column">
          <Tabs>
            <Tab label="Aim">
              <div style={styles.background}>
                <List>
                  <ListItem primaryText="Pomo App is a free, cross-platform time-management application."/>
                </List>
              </div>
            </Tab>
            <Tab label="Features">
              <div style={styles.background}>
                <List>
                  <ListItem primaryText="A countdown Timer which can be paused at wish, can play even when you are not online."/>
                  <ListItem primaryText="Adding listing, editing, checking and deleting tasks."/>
                  <ListItem primaryText="Connection to trello account and ability to use tables."/>
                </List>
              </div>
            </Tab>
            <Tab label="Known Issues">
              <div style={styles.background}>
                <List>
                  <ListItem primaryText="Countdown Timer play pause button, if clicked too much, can play the timer much quicker. Workaround is to press pause, wait a second, press play just after."/>
                </List>
            </div>
          </Tab>
          <Tab label="Patch Notes">
            <div style={styles.background}>
              <List>
                <ListItem style={styles.headline} primaryText="Patch 0.9.0"/>
                <ListItem
                  primaryText="What's New: "
                  nestedItems={[
                    <ListItem key={1} primaryText="Basic validation rules are added to signin and signup functions."/>,
                    <ListItem key={2} primaryText="Checking tasks is now possible."/>,
                  ]}
                />
                <ListItem
                  primaryText="Changes: "
                  nestedItems={[
                    <ListItem key={1} primaryText="Clock size adjusted."/>,
                    <ListItem key={2} primaryText="About page patch notes are updated."/>,
                  ]}
                />
                <ListItem
                  primaryText="Fixes: "
                  nestedItems={[
                    <ListItem key={1} primaryText="Several unused code is deleted and performance seems to be getting much better."/>,
                  ]}
                />
              </List>
            </div>
          </Tab>
          </Tabs>
        </Flexbox>
      </MuiThemeProvider>
    );
  }

}
