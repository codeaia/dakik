import React, { Component, constructor} from 'react';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox justifyContent="center" flexDirection="column">
            <Paper className="paragraph" zDepth={2}>
              <h3 className="about_header">AIM</h3>
              <p>-Our aim is to ease time-management of our users.</p>
            </Paper>
            <Paper className="paragraph" zDepth={2}>
              <h3 className="about_header">FEATURES</h3>
              <p>
                -First feature of our application is to provide in-app todo-list in which users can create, update, delete their tasks in application.<br />
                -Second feature of our application is cross platform meaning that users can access our application from web, mobile, and desktop.<br />
                -Third feature is in-app timer to let users manage tasks within certain time periods.<br />
                -Fourth feature is to integrate similar task management applications such as trello and wunderlist.
              </p>
            </Paper>
            <Paper className="paragraph" zDepth={2}>
              <h3 className="about_header">TEAM</h3>
              <p>
                <a href="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" target="_blank">Abdullah ÖĞÜK - UI Designer</a><br />
                <a href="http://i.imgur.com/sMQoX48.gif" target="_blank">Ahmet KAŞİF - Developer</a><br />
                <a href="https://media.giphy.com/media/CovFciJgWyxUs/giphy.gif" target="_blank">İbrahim KONUK - Artist</a><br />
                <a href="https://media.giphy.com/media/lXiRG1vwLewnehlxS/giphy.gif" target="_blank">Hilmi ARAZ - Integrator</a><br />
                <a href="https://media.giphy.com/media/SKUhuXbT0OjwA/giphy.gif" target="_blank">Uğur KAFALI - Integrator</a>
              </p>
            </Paper>
            <Paper className="paragraph" zDepth={2}>
              <h3 className="about_header">PATCH NOTES</h3>
              <p>
                Whats New<br />
                -All 3 statistical graphs have been implemented.<br />
                -Loading component's animation updated.<br />
                Changes<br />
                -ChatFrame deleted.<br />
                -Recursive timer function is updated to work every 200ms in order to handle pause-unpause bug.<br />
                Fixes<br />
                -Chat component re-implemented.<br />
                -Clock and integration components simplified.<br />
                -Syntax fixes.
              </p>
              </Paper>
              <Paper className="paragraph" zDepth={2}>
                <h3 className="about_header">ISSUES</h3>
                <p>
                  -If you start the task and exit from application and than if you open it afterwards task finihes, application crashes
                </p>
              </Paper>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}
