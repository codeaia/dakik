import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



export default class TaskEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        taskName: '',
        priority: 0,
        tags: [
            {
                name: "example",
                color: "purple"
            }
        ]
    };
    this.handlePriority = this.handlePriority.bind(this);
    this.renderTags = this.renderTags.bind(this);

    console.log('Task Edit Loaded..');
  }

  handlePriority(event, index, value){
      this.setState({priority:value});
  }

  renderTags() {
    return this.state.tags.map((tag) => (
      <button className = "tagName" style = {{backgroundColor: tag.color}}>{tag.name}</button>
    ));
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Flexbox className="taskEdit" >
            <Flexbox className="taskNameCont">
              <TextField
                className="taskInput"
                id ="taskInput"
                name="taskInput"
                type="text"
                hintText = "Task Name"
                fullWidth = "false"
                style ={{fontSize: "7em",height:"100%"}}
                hintStyle ={{height:"50%", width:"100%"}}

                />
            </Flexbox>

            <Flexbox className="priority">
                <SelectField
                        floatingLabelText="Priority"
                        value={this.state.priority}
                        fullWidth = "true"
                        onChange={this.handlePriority}
                >
                    <MenuItem value={0} primaryText="" />
                    <MenuItem value={1} primaryText="1 (Urgent)" />
                    <MenuItem value={2} primaryText="2 (Today)" />
                    <MenuItem value={3} primaryText="3 (This Week)" />
                    <MenuItem value={4} primaryText="4 (This Month)" />
                    <MenuItem value={5} primaryText="5 (Any Time)" />
                </SelectField>
            </Flexbox>

            <Flexbox className="taskPrefs">
                <Flexbox className="taskPrefEach">
                    <p className="prefName">Total</p>
                    <p className="prefName">Total Pomos</p>

                </Flexbox>

                <Flexbox className="taskPrefEach">
                    <p className="prefValue">1 hours</p>
                    <div className="totalPomosPref">
                        <p className="prefValue">2</p>
                        <button type="button" className="resetButton">Reset</button>
                    </div>
                </Flexbox>
            </Flexbox>

            <Flexbox className="sTagsButtonCont">
                <button type="button" className="sTagsButton">Select Tags</button>
            </Flexbox>

            <Flexbox className="ownTags">
                {this.renderTags()}
            </Flexbox>

            <Flexbox className="bottomNav">
                <button type="button" className="cancel">Cancel</button>
                <button type="button" className="ok">OK</button>


            </Flexbox>

        </Flexbox>
      </MuiThemeProvider>
    );
  }

}
