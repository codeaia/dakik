import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Image, Header, Segment, Label, Icon, Card, Input, Button, Menu } from 'semantic-ui-react';

import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import Nav from './Nav.jsx';
import StatisticsContainer from './Statistics.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);

  	this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    Meteor.logout(() => this.props.history.push('/auth'));
  }

  render() {
    if (this.props.user) {
      return (
        <div>
          <Nav history={this.props.history} location={this.props.location} />
          <Card className="profile">
            <Card.Content header={
              <div className="profileTop">
                <Header as='h4' image>
                  <Image src='/jsa-128.jpg' shape='circular' size='big' />
                  <Header.Content>
                    {this.props.user.username}
                    <Header.Subheader>{this.props.user.emails[0].address}</Header.Subheader>
                  </Header.Content>
                </Header>
                <div>
                  <Button
                    icon={<Icon link as="span" className='fa fa-cog'/>}
                    content='Settings'
                    labelPosition='left'
                    color='teal'
                    className="animated fadeIn"
                    onClick={() => this.props.history.push('/settings/account')}
                  />
                  <Button
                    icon={<Icon link as="span" className='fa fa-sign-out'/>}
                    content='Logout'
                    labelPosition='left'
                    color='red'
                    className="animated fadeIn"
                    onClick={this.handleLogout}
                  />
                </div>
              </div>
            } />
            <Card.Content description={
              <div>
                <h4>Today's Stats</h4>
                Finished Tasks: {this.props.dailyStat ? this.props.dailyStat.finishedTaskCount: 0}<br/>
                Finished Pomos: {this.props.dailyStat ? this.props.dailyStat.finishedPomoCount: 0}<br/>
                <StatisticsContainer />
              </div>
            }/>
          </Card>
        </div>
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
