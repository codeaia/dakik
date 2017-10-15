import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Image, Header, Label, Icon, Card, Button } from 'semantic-ui-react';
import Gravatar from 'react-gravatar';
import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import StatisticsContainer from './Statistics.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user) {
      return (
        <Card className="profile">
          <Card.Content header={
            <div className="profileTop">
              <Header as='h4' image>
                <Gravatar email={this.props.user.emails[0].address} />
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
                  onClick={() => Meteor.logout(() => this.props.history.push('/auth'))}
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
