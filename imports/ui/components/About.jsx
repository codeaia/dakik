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
          <h1>About Page</h1>
          <Tabs>
            <Tab label="Aim">
              <div style={styles.background}>
                <List>
                  <ListItem primaryText="Our aim is to produce a self-control application for people which should be also fun to use."/>
                </List>
              </div>
            </Tab>
            <Tab label="Features">
              <div style={styles.background}>
                <List>
                  <ListItem primaryText="A countdown Timer which can be paused at wish, can play even when you are not online."/>
                  <ListItem primaryText="Adding listing, editing and deleting tasks."/>
                  <ListItem primaryText="Connection to trello account and ability to use tables."/>
                </List>
              </div>
            </Tab>
            <Tab label="Known Issues">
              <div style={styles.background}>
                <List>
                  <ListItem primaryText="Currently No."/>
                </List>
            </div>
          </Tab>
          <Tab label="Patch Notes">
            <div style={styles.background}>
              <List>
                <ListItem style={styles.headline} primaryText="Patch 0.8.4"/>
                <ListItem
                  primaryText="Changes: "
                  nestedItems={[
                    <ListItem key={1} primaryText="About page is now changed."/>,
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
