import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import ActionsMenu from './ActionsMenu.jsx';
import Counter from './Counter.jsx';
import TaskFrame from './TaskFrame.jsx';

import { MdHome, MdPlaylistAddCheck, MdInsertChart ,MdAddBox} from 'react-icons/lib/md';

export default class Home extends Component {

  constructor(props) {
    super(props);
    console.log('Home Page Loaded..');
  }

  render() {
    return (
      <div>
        <ActionsMenu />
        <Counter />
        <Flexbox className="tagFrame" style={{backgroundColor: this.props.color}}>
          <Flexbox className = "tagFrameHeader">
            <p className = "tagName">#{this.props.tagName}</p>
            <MdAddBox className = "addButton"></MdAddBox>
            <p className = "totalPomos">{this.props.totalPomos}</p>
          </Flexbox>
          <Flexbox className="tagFrameBody">
            <TaskFrame taskName="Project Meeting" totalPomos="3"></TaskFrame>
            <TaskFrame taskName="Math Exam" totalPomos="5"></TaskFrame>
            <TaskFrame taskName="Lorem" totalPomos="6"></TaskFrame>
            <TaskFrame taskName="Ipsum" totalPomos="8"></TaskFrame>
            <TaskFrame taskName="Dolor" totalPomos="15"></TaskFrame>
            <TaskFrame taskName="Sid" totalPomos="25"></TaskFrame>
          </Flexbox>
        </Flexbox>
      </div>
    );
  }

}
