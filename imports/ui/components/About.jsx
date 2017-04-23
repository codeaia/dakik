import React, { Component, constructor} from 'react';
import { Grid, Menu, Segment, Label, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
      <div className="about">
        <Segment className="aboutCard">
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
                <h3>Dakik App 1.5.3</h3>
                <div> Copyright © 2017 <a style={{"display": "inline-block"}} href="http://codeaia.ga/" target="_blank"> Codeaia Team</a></div><br />
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
                  <Label as='div' color='yellow' image>
                    İbrahim KONUK
                    <Label.Detail>Artist</Label.Detail>
                    <Label.Detail as="a" href="https://github.com/iknk" target="_blank"><span className="fa fa-github"></span><br /></Label.Detail>
                    <Label.Detail as="a" href="https://twitter.com/ibrahimk0nuk" target="_blank"><span className="fa fa-twitter"></span><br /></Label.Detail>
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
                </div>
              </Segment>
              : ""}
              {this.state.activeItem === "features" ?
              <Segment>
                <h3 className="about_header">FEATURES</h3>
                <p>
                  Our aim is to ease time-management of our users. Main feature of our application is to provide in-app todo-list in which users can create, update, delete their tasks in application. Secondarily our application is cross platform meaning that users can access our application from web, mobile, and desktop. Third one is in-app timer to let users manage tasks within certain time periods. Our fourth feature is to integrate similar task management applications such as trello and wunderlist. Last feature of our application is to provide visual statistics of our users actions like the percentage of completed tasks etc. Implementation and technology wise, we preferred to use javascript and corresponding technologies such as MeteorJs as our core framework to build on, React for our front-end and Victory for our graph visualizations along with MaterialUI css toolkit to speed up our development process.
                </p>
              </Segment>
              : ""}
              {this.state.activeItem === "notes" ?
              <Segment>
                <h3 className="about_header">LTP 1.5.0</h3>
                <p>
                  What's New:<br/>
                  - Meteor is updated to 1.4.4.1<br/><br/>
                  Adjustments:<br/>
                  - Two new collections namely 'pomos' and 'stats' are added.<br/>
                  - React router has been implemented as our new routing mechanism.<br/>
                  - About page got a visual rehaul.<br/>
                  - Users can no longer manually check tasks, instead they should match the task goal.<br/>
                  - Snackbars and authentication input checking is cancelled.<br/>
                  - IntegrationAuth is renamed to TrelloApi.<br/>
                  - WunderlistApi is no longer a child of TrelloApi.<br/><br/>
                  Fixes:<br/>
                  - Pagination bug is resolved which was causing wrong tasks to be rendered.<br/>
                  - Timer animation is working once again.<br/>
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
