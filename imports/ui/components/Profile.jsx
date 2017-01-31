import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    Trello.authorize({
      interactive:false,
    });

    var isLoggedIn = Trello.authorized();

    if(isLoggedIn) {
      this.state = {
        open: false,
        disabled: true,
        disabled2: false
      }
    } else {
      this.state = {
        open: false,
        disabled: false,
        disabled2: true
      }
    }

    this.connectToTrello = this.connectToTrello.bind(this);
    this.onAuthorize = this.onAuthorize.bind(this);
    this.onAuthorize2 = this.onAuthorize2.bind(this);
    this.exitFromTrello = this.exitFromTrello.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleDisabled2 = this.handleDisabled2.bind(this);

    Trello.authorize({
      interactive:false,
      success: this.onAuthorize2
    });
  }

  connectToTrello(){
    Trello.authorize({
      name: "PROJECT",
      type: "popup",
      success: this.onAuthorize
    })
  }

  updateLogin() {
    var isLoggedIn = Trello.authorized();
    $(".exit").toggle(isLoggedIn);
    $(".connect").toggle(!isLoggedIn);
  }

  exitFromTrello() {
    Trello.deauthorize();
    $(".output").empty();
    this.handleDisabled2();
    this.handleDisabled();
  }

  onAuthorize() {  // Boardları yazdıracağımız yer
    this.handleDisabled();
    this.handleDisabled2();

    $(".output").empty();

    Trello.members.get("me", function(member){
        //$("#fullName").text(member.fullName);

        var $cards = $("<div>")
            .text("Loading Cards...")
            .appendTo(".output");

        // Output a list of all of the cards that the member
        // is assigned to
        //Trello.get("lists/5853d4b1d571299a7aeeb3d5/cards", function(cards) { Belirli bir listedeki cardları alıyo
        //Trello.get("boards/581379388d608e841d188d97/cards", function(cards) {  Bütün cardları alıyo
        Trello.get("/member/me/boards", function(cards) {
            $cards.empty();
            $.each(cards, function(ix, card) {
                $("<a>")
                .attr({href: card.url, target: "trello"})
                .addClass("card")
                .text(card.name)
                .appendTo($cards);
            });//each
        });//Trello.get ++ boards
    });//Trello.get ++ name
  }

  onAuthorize2() {
    $(".output").empty();

    Trello.members.get("me", function(member){
        //$("#fullName").text(member.fullName);

        var $cards = $("<div>")
            .text("Loading Cards...")
            .appendTo(".output");

        // Output a list of all of the cards that the member
        // is assigned to
        //Trello.get("lists/5853d4b1d571299a7aeeb3d5/cards", function(cards) { Belirli bir listedeki cardları alıyo
        //Trello.get("boards/581379388d608e841d188d97/cards", function(cards) {  Bütün cardları alıyo
        Trello.get("/member/me/boards", function(cards) {
            $cards.empty();
            $.each(cards, function(ix, card) {
                $("<a>")
                .attr({href: card.url, target: "trello"})
                .addClass("card")
                .text(card.name)
                .appendTo($cards);
            });//each
        });//Trello.get ++ boards
    });//Trello.get ++ name
  }

  handleDisabled() {
    this.setState({disabled: !this.state.disabled});
  }

  handleDisabled2() {
    this.setState({disabled2: !this.state.disabled2});
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={ this.props.currentUser ? this.props.currentUser.username : 'error'}
            subtitle= { this.props.currentUser ? this.props.currentUser.emails[0].address : 'error'}
            avatar="/jsa-128.jpg"
            />
          <CardTitle title="İstatistiklerin"/>
          <CardText>
            Friends: 4<br/>
            Task Record: 2<br/>
            Tag Record: 3<br/>
          </CardText>
          <CardActions>
            <FlatButton disabled={this.state.disabled} className="connect" label="Connect to Trello" onTouchTap={this.connectToTrello}/>
            <FlatButton disabled={this.state.disabled2} className="exit" label="Disconnect from Trello" onTouchTap={this.exitFromTrello}/>
            <div className="output"></div>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}
