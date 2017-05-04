import React, { Component } from 'react';
import { Grid, Menu, Segment, Label, Icon } from 'semantic-ui-react';

import Nav from './Nav.jsx';
import TrelloApiContainer from './TrelloApi.jsx';
import WunderlistApiContainer from './WunderlistApi.jsx';

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav history={this.props.history} location={this.props.location} />
        <Segment className = "settingsCont">
      		<Grid className="about-semantic">
      		  <Grid.Column width={4}>
        			<Menu pointing secondary vertical>
        			  <Menu.Item name='trello' active={this.props.location.pathname === "/settings/trello" ? true : false} onClick={() => this.props.history.push('/settings/trello')} >Trello</Menu.Item>
        			  <Menu.Item name='wunderlist' active={this.props.location.pathname === "/settings/wunderlist" ? true : false} onClick={() => this.props.history.push('/settings/wunderlist')} >Wunderlist</Menu.Item>
        			</Menu>
      		  </Grid.Column>
      		  <Grid.Column stretched width={12}>
        			{this.props.location.pathname === "/settings/trello" ?
        			<Segment className = "sementicSegment">
        				<TrelloApiContainer history={this.props.history} />
        			</Segment>
        			: ""}
        			{this.props.location.pathname === "/settings/wunderlist" ?
        			<Segment className = "sementicSegment">
        				<WunderlistApiContainer history={this.props.history} />
        			</Segment>
        			: ""}
        		</Grid.Column>
      		</Grid>
        </Segment>
      </div>
    );
  }
}
