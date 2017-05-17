import React, { Component, constructor } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { VictoryLine, VictoryPie, VictoryTheme, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryTooltip, VictoryVoronoiContainer, VictoryZoomContainer, VictoryScatter } from 'victory';

import { Stats } from '../../api/stats.js';

import Loading from './Loading.jsx';
import Flexbox from 'flexbox-react';

class Statistics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="graph">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={1}
          width={500}
          height={300}
          containerComponent={<VictoryVoronoiContainer/>}>
          <VictoryLabel x={200} y={40} text={"This week's performance: " + this.props.cumulativePomos + " pomos, " + this.props.cumulativeTasks + " tasks."} />
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
        <VictoryPie
          width={150}
          height={150}
          theme={VictoryTheme.material}
          innerRadius={2}
          data={[
            {profit: 5},
            {profit: 2}
          ]}
          x={1, 2}
          y={(data) => data.profit}
        />
      </div>
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
