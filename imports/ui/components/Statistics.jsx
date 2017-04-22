import React, { Component, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { VictoryLine, VictoryTheme, VictoryChart, VictoryAxis, VictoryStack, VictoryZoomContainer, VictoryScatter } from 'victory';

import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import Flexbox from 'flexbox-react';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleZoom = this.handleZoom.bind(this);
    this.handleBrush = this.handleBrush.bind(this);
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    return(
      <VictoryChart
		className = "chart chart1"
        domainPadding={20}
        theme={VictoryTheme.material}
        width={1000}
        height={350}
        scale={{x: "time"}}
        containerComponent={
          <VictoryZoomContainer responsive={false}
            dimension="x"
            zoomDomain={this.state.zoomDomain}
            onDomainChange={this.handleZoom.bind(this)}
          />
        }>
        <VictoryAxis
          crossAxis={false}
          tickValues={this.props.dates}
          tickFormat={(x) => {return x;}}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x}`)}
        />
        <VictoryLine data={this.props.pomoGraph} x="key" y="value" />
        <VictoryScatter data={this.props.pomoGraph} x="key" y="value" />
        <VictoryLine data={this.props.taskGraph} x="key" y="value" style={{data: {stroke: "tomato"}}}/>
        <VictoryScatter data={this.props.taskGraph} x="key" y="value" style={{data: {stroke: "tomato"}}}/>
      </VictoryChart>
    );
  }
}

export default StatisticsContainer = createContainer(() => {
  Meteor.subscribe('stats');
  var user = Meteor.user();
  var stats = Stats.find().fetch();
  var pomoGraph = [];
  var taskGraph = [];
  var dates = [];
  var today = new Date();
  var tempDate = today.getDate() + "/" + (today.getMonth() + 1);

  for (var i = 0; i < 30; i++) {
    dates[29 - i] = tempDate;
    pomoGraph.push({
      date: i,
      value: 0
    });
    taskGraph.push({
      date: i,
      value: 0
    });
  }

  if (stats[0] !== undefined) {
    for (var i = 0; i < stats.length; i++) {
      pomoGraph[i].date = stats[i].date;
      taskGraph[i].date = stats[i].date;
      pomoGraph[i].value = stats[i].finishedPomoCount;
      taskGraph[i].value = stats[i].finishedTaskCount;
    }
  }

  return{
    user,
    pomoGraph,
    taskGraph,
    dates,
  };
}, Statistics);
