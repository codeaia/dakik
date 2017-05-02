import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { VictoryLine, VictoryTheme, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryTooltip, VictoryVoronoiContainer, VictoryZoomContainer, VictoryScatter } from 'victory';

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
        theme={VictoryTheme.material}
        domainPadding={1}
        width={1000}
        height={350}
        containerComponent={<VictoryVoronoiContainer/>}
      >
        <VictoryLabel x={600} y={40} text={"Finished Pomo Count: " + this.props.cumulativePomos} />
        <VictoryLabel x={800} y={40} text={"Finished Task Count: " + this.props.cumulativeTasks} />
        <VictoryAxis />
        <VictoryAxis dependentAxis={true}/>
        <VictoryGroup colorScale={["teal", "red"]} data={this.props.pomoGraph}>
          <VictoryLine interpolation="monotoneX" labelComponent={<VictoryTooltip/>} />
          <VictoryScatter labelComponent={<VictoryTooltip/>} />
        </VictoryGroup>
        <VictoryGroup colorScale={["brown", "red"]} data={this.props.taskGraph}>
          <VictoryLine interpolation="monotoneX" labelComponent={<VictoryTooltip/>} />
          <VictoryScatter labelComponent={<VictoryTooltip/>} />
        </VictoryGroup>
      </VictoryChart>
    );
  }
}

export default StatisticsContainer = createContainer(() => {
  Meteor.subscribe('stats');
  var stats = Stats.find().fetch();
  var pomoGraph = [];
  var taskGraph = [];
  var cumulativePomos = 0;
  var cumulativeTasks = 0;

  for (var i = 0; i < 30; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    if (d.getDate() < 10) {
      pomoGraph.push({
        x: "0" + d.getDate() + "/" + (d.getMonth() + 1),
        y: 0,
        label: 0
      });
      taskGraph.push({
        x: "0" + d.getDate() + "/" + (d.getMonth() + 1),
        y: 0,
        label: 0
      });
    } else {
      pomoGraph.push({
        x: d.getDate() + "/" + (d.getMonth() + 1),
        y: 0,
        label: 0
      });
      taskGraph.push({
        x: d.getDate() + "/" + (d.getMonth() + 1),
        y: 0,
        label: 0
      });
    }

  }

  if (stats[0] !== undefined) {
    for (var i = 0; i < stats.length; i++) {
      pomoGraph[i].y = stats[i].finishedPomoCount;
      cumulativePomos += stats[i].finishedPomoCount;
      pomoGraph[i].label = stats[i].finishedPomoCount + " Pomos finished at " + pomoGraph[i].x;
      taskGraph[i].y = stats[i].finishedTaskCount;
      cumulativeTasks += stats[i].finishedTaskCount;
      taskGraph[i].label = stats[i].finishedTaskCount + " Tasks finished at " + taskGraph[i].x;
    }
  }

  return{
    pomoGraph,
    taskGraph,
    cumulativePomos,
    cumulativeTasks
  };
}, Statistics);
