import React, { Component } from 'react';
import { Grid, Menu, Segment, Label, Icon } from 'semantic-ui-react';

import Nav from './Nav.jsx';

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'about'
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(event, { name }){
    this.setState({ activeItem: name });
  }

  render() {
    return (
      <div>
        <Nav history={this.props.history} location={this.props.location} />
        <Segment className="about">
          <Grid className="about-semantic">
            <Grid.Column width={4}>
              <Menu pointing secondary vertical>
                <Menu.Item name='about' active={this.state.activeItem === 'about'} onClick={this.handleItemClick}>About</Menu.Item>
                <Menu.Item name='features' active={this.state.activeItem === 'features'} onClick={this.handleItemClick}>Features</Menu.Item>
                <Menu.Item name='notes' active={this.state.activeItem === 'notes'} onClick={this.handleItemClick}>Changelog</Menu.Item>
                <Menu.Item name='Licenses' active={this.state.activeItem === 'Licenses'} onClick={this.handleItemClick} ></Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column stretched width={12}>
              {this.state.activeItem === "about" ?
              <Segment className="sementicSegment">
                <div className="aboutLogo"><img src="icong.svg" alt=""/></div>
                <h3>Dakik 1.6.2</h3>
                <div> Copyright © May 2017 <a style={{"display": "inline-block"}} href="http://codeaia.ga/" target="_blank"> Codeaia Team</a></div><br />
                <div className="teamContainer">
                  <Label as='div' color='teal' image>
                    Abdullah ÖĞÜK
                    <Label.Detail>UI/UX Developer</Label.Detail>
                    <Label.Detail as="a" href="http://abdullahoguk.ga/" target="_blank"><span className="fa fa-globe"></span><br /></Label.Detail>
                    <Label.Detail as="a" href="https://github.com/abdullahoguk" target="_blank"><span className="fa fa-github"></span><br /></Label.Detail>
                    <Label.Detail as="a" href="https://twitter.com/abdullahoguk" target="_blank"><span className="fa fa-twitter"></span><br /></Label.Detail>
                  </Label>
                  <Label as='div' color='red' image>
                    Ahmet KAŞİF
                    <Label.Detail>Core Developer </Label.Detail>
                    <Label.Detail as="a" href="http://ahmetk.cf/" target="_blank"><span className = "fa fa-globe"></span><br /></Label.Detail>
                    <Label.Detail as="a" href="https://github.com/ahmetkasif" target="_blank"><span className="fa fa-github"></span><br /></Label.Detail>
                    <Label.Detail as="a" href="https://twitter.com/ksfahmet" target="_blank"><span className="fa fa-twitter"></span><br /></Label.Detail>
                  </Label>
                  <Label as='div' color='green' image>
                    Hilmi ARAZ
                    <Label.Detail>Integration Developer</Label.Detail>
                    <Label.Detail as="a" href="https://github.com/hilmi3x" target="_blank"><span className = "fa fa-github"> </span><br /></Label.Detail>
                    <Label.Detail as="a" href="https://twitter.com/RZhealme" target="_blank"><span className = "fa fa-twitter"> </span><br /></Label.Detail>
                  </Label><Label as='div' color='purple' image>
                    Uğur KAFALI
                    <Label.Detail>Integration Developer</Label.Detail>
                    <Label.Detail as="a" href="https://github.com/raguer100" target="_blank"><span className = "fa fa-github"> </span><br /></Label.Detail>
                  </Label>
                  <Label as='div' color='yellow' image>
                    İbrahim KONUK
                    <Label.Detail>Artist</Label.Detail>
                    <Label.Detail as="a" href="https://github.com/iknk" target="_blank"><span className="fa fa-github"></span><br /></Label.Detail>
                    <Label.Detail as="a" href="https://twitter.com/ibrahimk0nuk" target="_blank"><span className="fa fa-twitter"></span><br /></Label.Detail>
                  </Label>
                </div>
              </Segment>
              : ""}
              {this.state.activeItem === "features" ?
              <Segment>
                <h3 className="about_header">FEATURES</h3>
                <p>
                  Our aim is to ease time-management of our users.<br/><br/>
                  <b>Features</b>:<br/>
                  1) Providing in-app todo-list in which users can create, update, delete their tasks in one application.<br/>
                  2) In-app timer to let users manage their tasks within the same application.<br/>
                  3) Independent of platform; meaning that users can access our application from web, mobile, and desktop.<br/>
                  4) Integration of similar task management applications such as <b>trello</b> and <b>wunderlist</b>.<br/>
                  5) Providing visual statistics of our users actions like the percentage of completed tasks etc.<br/><br/>
                  Implementation and technology wise, we preferred to use <b>javascript</b> and corresponding technologies such as <b>MeteorJs</b> as our core framework to build on, <b>React</b> for our front-end and <b>Victory</b> for our graph visualizations along with <b>semantic-ui</b> css toolkit to speed up our development process.
                </p>
              </Segment>
              : ""}
              {this.state.activeItem === "notes" ?
              <Segment>
                <h3 className="about_header">1.6.0</h3>
                <p>
                  What's New:<br/>
                  - animate.css support is added.<br/>
                  - Total Pomo and Task count statistics are added.<br/>
                  - Task text is now indicating currently processed task.<br/><br/>
                  Adjustments:<br/>
                  - Patch notes updated.<br/>
                  - Timing and cross-platform functionalities got a rehaul. From now on, only the dueTime will be kept and all calculations will be done according to that.<br/>
                  - When logged in on a secondary client as a user, your other logged in pages will be logged out.<br/>
                  - Profile page adjusted to use semantic-ui.<br/>
                  - NPM Package versions has been reverted back.<br/>
                  - Several optimizations has been applied to our code base.<br/>
                </p>
              </Segment>
              : ""}
              {this.state.activeItem === "Licenses" ?
              <Segment>
                <h3>MIT License</h3><br/>

                Copyright (c) 2017 Codeaia<br/><br/>

                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:<br/><br/>

                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.<br/><br/>

                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </Segment>
              : ""}
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}
