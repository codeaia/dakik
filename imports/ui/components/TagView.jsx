import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';


import ActionsMenu from './ActionsMenu.jsx';
import Counter from './Counter.jsx';
import TaskFrame from './TaskFrame.jsx';
import Nav from './Nav.jsx';

import { MdHome, MdPlaylistAddCheck, MdInsertChart ,MdAddBox} from 'react-icons/lib/md';
export default class TagView extends Component {

  constructor(props) {
    super(props);
    console.log('TagView Loaded..');
    this.props = {
      tagName: "",
      color: "",
      totalPomos: ""
    };

  }

componentWillMount(){
    document.body.style.backgroundColor = this.props.color;
    //document.getElementById("Nav").style.backgroundColor = this.props.color;

}
componentWillUnmount(){
    document.body.style.backgroundColor = null;
    //document.getElementById("Nav").style.backgroundColor = null;
}

  render() {
  	//fetch data of tag with tagName
    return (
      <Flexbox className="tagView" style={{backgroundColor: this.props.color}}>
          <Flexbox className = "tagViewHeader">
            <p className = "tagViewName">#{this.props.tagName}</p>
            <MdAddBox className = "addButton"></MdAddBox>
            <p className = "totalPomos">{this.props.totalPomos}</p>
          </Flexbox>
          <Flexbox className="tagViewBody">
            <TaskFrame taskName="Project Meeting" totalPomos="3"></TaskFrame>
            <TaskFrame taskName="Math Exam" totalPomos="5"></TaskFrame>
            <TaskFrame taskName="Lorem" totalPomos="6"></TaskFrame>
            <TaskFrame taskName="Ipsum" totalPomos="8"></TaskFrame>
            <TaskFrame taskName="Dolor" totalPomos="15"></TaskFrame>
            <TaskFrame taskName="Sid" totalPomos="25"></TaskFrame>
          </Flexbox>
        </Flexbox>

    );
  }

}
