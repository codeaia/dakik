import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { VictoryLine, VictoryPie, VictoryTheme, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryTooltip, VictoryVoronoiContainer, VictoryZoomContainer, VictoryScatter } from 'victory';

import { Stats } from '../../api/stats.js';
import { Goals } from '../../api/goals.js';

import Loading from './Loading.jsx';
import Flexbox from 'flexbox-react';

class Statistics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div>
          {"This week's performance: " + this.props.cumulativePomos + " pomos, " + this.props.cumulativeTasks + " tasks."}
        </div>
        <div className="svgContainer">
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={1}
            width={350}
            height={200}
            containerComponent={<VictoryVoronoiContainer/>}>
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
        </div>
      </div>
    );
  }
}

export default StatisticsContainer = createContainer(() => {
  Meteor.subscribe('stats');
  Meteor.subscribe('goals');
  var stats = Stats.find().fetch();
  var pomoGraph = [];
  var taskGraph = [];
  var cumulativePomos = 0;
  var cumulativeTasks = 0;

  for (var i = 0; i < 7; i++) {
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
    var lastDate = new Date(stats[0].date);
    for (var i = 0; i < stats.length; i++) {
      var date = new Date(stats[i].date);

      var timeDiff = Math.abs(lastDate.getTime() - date.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays < 7) {
        pomoGraph[diffDays].y = stats[i].finishedPomoCount;
        cumulativePomos += stats[i].finishedPomoCount;
        pomoGraph[diffDays].label = stats[i].finishedPomoCount + " Pomos finished at " + pomoGraph[i].x;

        taskGraph[diffDays].y = stats[i].finishedTaskCount;
        cumulativeTasks += stats[i].finishedTaskCount;
        taskGraph[diffDays].label = stats[i].finishedTaskCount + " Tasks finished at " + taskGraph[i].x;
      }
    }
  }

  return{
    pomoGraph,
    taskGraph,
    cumulativePomos,
    cumulativeTasks
  };
}, Statistics);
