import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Flexbox from 'flexbox-react';

import { Chats } from '../../api/chats.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

class Chat extends Component {

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
			createdAt: new Date(),
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
		return this.props.messages.map((chat) => (
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

export default ChatContainer = createContainer(() => {
	Meteor.subscribe('chats');
	const messages = Chats.find({}).fetch();

	return {
		messages,
	};
}, Chat);
