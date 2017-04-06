import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import Flexbox from 'flexbox-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export default class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  sendMessage(){
    const message = this.state.message;
    const ownerId = this.props.userId;
    const ownerName = this.props.username;

    Chats.insert({
      message,
      ownerId,
      ownerName,
      createdAt: new Date(), // current time
    });

    this.updateMessage('');
  }

  updateMessage(event, value){
    const message = value;
    this.setState({
      message,
    });
  }

  renderMessages(){
    return this.props.chats.map((chat) => (
      <ListItem primaryText={chat.message} secondaryText={chat.ownerName} />
    ));
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title = "Support"
            />
          <CardText>
            <List>
              {this.renderMessages()}
            </List>
          </CardText>
          <CardActions>
            <TextField
              name={this.state.message}
              type="text"
              onChange={this.updateMessage}
              floatingLabelText="Message:"
            />
            <RaisedButton
              label="Send"
              onTouchTap={this.sendMessage}
            />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}
