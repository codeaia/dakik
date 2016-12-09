import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MdHome, MdPlaylistAddCheck, MdInsertChart, MdLabel, MdMoreVert } from 'react-icons/lib/md';
import { FaTag } from 'react-icons/lib/fa';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


export default class ActionsMenu extends Component {

  constructor(props) {
    super(props);
    console.log('Actions Menu Loaded..');

  }

  render() {
    return (
      <Flexbox className="homeTitle">
        <Flexbox className="tIconCont curr">
          <FaTag className="tIcon" id="TagMenuIcon"></FaTag>
        </Flexbox>
        <Flexbox className="tIconCont">
          <p className="title">POMO</p>
        </Flexbox>
        <Flexbox className="tIconCont">
          <MuiThemeProvider>
            <IconMenu
              className="tIcon"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          </MuiThemeProvider>
        </Flexbox>
      </Flexbox>
    );
  }

}
