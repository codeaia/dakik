import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';

export default class IntegrationAuth extends Component {
  constructor(props) {
    super(props);

    Trello.authorize({
      interactive:false,
    });

    var isLoggedIn = Trello.authorized();
    if(isLoggedIn) {
      this.state = {
        disabled: true,
        disabled2: false
      }
    } else {
      this.state = {
        disabled: false,
        disabled2: true
      }
    }

    Trello.authorize({
      interactive:false,
      success: this.onAuthorize2
    });

    this.connectToTrello = this.connectToTrello.bind(this);
    this.onAuthorize = this.onAuthorize.bind(this);
    this.onAuthorize2 = this.onAuthorize2.bind(this);
    this.exitFromTrello = this.exitFromTrello.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleDisabled2 = this.handleDisabled2.bind(this);
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
        <Flexbox flexDirection="column">
          <Tabs>
            <Tab label="Trello">
                <FlatButton disabled={this.state.disabled} className="connect" label="Connect to Trello" onTouchTap={this.connectToTrello}/>
                <FlatButton disabled={this.state.disabled2} className="exit" label="Disconnect from Trello" onTouchTap={this.exitFromTrello}/>
                <div className="output"></div>
            </Tab>
            <Tab label="Wunderlist">
              <div>
                Coming soon..
              </div>
            </Tab>
          </Tabs>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}
