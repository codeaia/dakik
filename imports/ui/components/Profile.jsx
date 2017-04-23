import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import StatisticsContainer from './Statistics.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import { Image, Header, Segment, Label, Icon } from 'semantic-ui-react';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openLogout: false,
    }

  	this.handleLogout = this.handleLogout.bind(this);
  	this.handleCloseLogout = this.handleCloseLogout.bind(this);
  	this.handleOpenLogout = this.handleOpenLogout.bind(this);
  }

  handleOpenLogout(){
    this.setState({openLogout: true});
  }

  handleCloseLogout(){
    this.setState({openLogout: false});
  }

  handleLogout(){
    Meteor.logout();
    this.props.history.push('/auth');
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseLogout}
        />,
      <FlatButton
        label="Log out"
        primary={true}
        onTouchTap={this.handleLogout}
        />,
    ];

    if (this.props.user) {
      return (
        <MuiThemeProvider>
          <Flexbox flexDirection="column" className="container profile">
            <Segment>
				<div className = "profileTop">
				<Header as='h4' image>
			        <Image src='/jsa-128.jpg' shape='circular' size='big' />
			        <Header.Content>
			            {this.props.user.username}
			            <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
			        </Header.Content>
		      	</Header>
              <IconButton iconClassName="fa fa-sign-out" style={{padding: '-12px'}} tooltip="Log out" onClick={this.handleOpenLogout}/>
			</div>
			<h2>Statistics</h2>
              <CardText>
                Finished Tasks: {this.props.dailyStat ? this.props.dailyStat.finishedTaskCount: 0}<br/>
                Finished Pomos: {this.props.dailyStat ? this.props.dailyStat.finishedPomoCount: 0}<br/>
                <StatisticsContainer />
              </CardText>
            <Dialog actions={actions} modal={false} open={this.state.openLogout} onRequestClose={this.handleCloseLogout}>
              Are you sure ?
            </Dialog>
            </Segment>
          </Flexbox>
        </MuiThemeProvider>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}

export default ProfileContainer = createContainer(() => {
  Meteor.subscribe('dailyStat');
  const user = Meteor.users.findOne(Meteor.userId(), {profile: 1, username: 1, emails: 1});
  const dailyStat = Stats.findOne();
  return{
    user,
    dailyStat,
  };
}, Profile);
