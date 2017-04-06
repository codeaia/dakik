import React, { Component, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Loading from './Loading.jsx';
import Flexbox from 'flexbox-react';

import { VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryStack } from 'victory';

class Statistics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Flexbox flexDirection="column">
        <Flexbox>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            width={350}
           >
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Task Count", "Trello", "Wunderlist"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryStack>
              <VictoryBar
                data={this.props.graph1Data}
                x="key"
                y="value"
              />
            </VictoryStack>
          </VictoryChart>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            width={350}
           >
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Task Count", "Completed Tasks", "Incomplete Tasks"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryStack colorScale={"warm"}>
              <VictoryBar
                data={this.props.graph2Data}
                x="key"
                y="value"
              />
            </VictoryStack>
          </VictoryChart>
        </Flexbox>
        <Flexbox>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            width={350}
           >
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Estimated Pomos", "Completed Pomos", "Remaining Pomos"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryStack colorScale={"warm"}>
              <VictoryBar
                data={this.props.graph3Data}
                x="key"
                y="value"
              />
            </VictoryStack>
          </VictoryChart>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default StatisticsContainer = createContainer(() => {
  var user = Meteor.user();

  var graph1Data = [
    {key: 1, value: user.profile.statistics.taskCount},
    {key: 2, value: user.profile.statistics.trelloTasksCount},
    {key: 3, value: user.profile.statistics.wunderlistTasksCount}
  ];

  var graph2Data = [
    {key: 1, value: user.profile.statistics.taskCount},
    {key: 2, value: user.profile.statistics.taskCount - user.profile.statistics.incompleteTasks},
    {key: 3, value: user.profile.statistics.incompleteTasks}
  ];

  var graph3Data = [
    {key: 1, value: user.profile.statistics.estimatedPomos},
    {key: 2, value: user.profile.statistics.completedPomos},
    {key: 3, value: user.profile.statistics.estimatedPomos - user.profile.statistics.completedPomos}
  ];

  return{
    user,
    graph1Data,
    graph2Data,
    graph3Data
  };
}, Statistics);
