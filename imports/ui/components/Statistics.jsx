import React, { Component, constructor, State } from 'react';
import { VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryStack } from 'victory';
import Loading from './Loading.jsx';
import Flexbox from 'flexbox-react';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskCountGraph: [
        {key: 1, value: 0},
        {key: 2, value: 0},
        {key: 3, value: 0}
      ],
      completenessGraph: [
        {key: 1, value: 0},
        {key: 2, value: 0},
        {key: 3, value: 0}
      ],
      estimationGraph: [
        {key: 1, value: 0},
        {key: 2, value: 0},
        {key: 3, value: 0}
      ]
    };

    this.renderCharts = this.renderCharts.bind(this);
  }

  componentWillReceiveProps(nextProps){
    var taskExist, trelloTaskExist, wunderlistTaskExist;

    if (nextProps.currentUser.profile.taskCount !== undefined) {
      taskExist = true;
    }

    if (nextProps.currentUser.profile.trelloTasksCount !== undefined) {
      trelloTaskExist = true;
    }

    if (nextProps.currentUser.profile.wunderlistTasksCount !== undefined) {
      wunderlistTaskExist = true;
    }

    var updatedData = this.state.taskCountGraph;
    if (taskExist) {
      updatedData[0].value = nextProps.currentUser.profile.taskCount;
    }

    if (trelloTaskExist) {
      updatedData[1].value = nextProps.currentUser.profile.trelloTasksCount;
    }

    if (wunderlistTaskExist) {
      updatedData[2].value = nextProps.currentUser.profile.wunderlistTasksCount;
    }

    this.setState({
      taskCountGraph: updatedData
    });
  }

  renderCharts(){
    return(
      <Flexbox>
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          theme={VictoryTheme.material}
          width={350}
         >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3]}
            tickFormat={["Task Count", "Trello", "Wunderlist"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryStack colorScale={"warm"}>
            <VictoryBar
              data={this.state.taskCountGraph}
              x="key"
              y="value"
            />
          </VictoryStack>
        </VictoryChart>
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          theme={VictoryTheme.material}
          width={350}
         >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3]}
            tickFormat={["Task Count", "Completed Tasks", "Incomplete Tasks"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryStack colorScale={"warm"}>
            <VictoryBar
              data={this.state.completenessGraph}
              x="key"
              y="value"
            />
          </VictoryStack>
        </VictoryChart>
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          theme={VictoryTheme.material}
          width={350}
         >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3]}
            tickFormat={["Estimated Pomos", "Completed Pomos", "Remaining Pomos"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryStack colorScale={"warm"}>
            <VictoryBar
              data={this.state.estimationGraph}
              x="key"
              y="value"
            />
          </VictoryStack>
        </VictoryChart>
      </Flexbox>
    );
  }

  render() {
    return (
      this.renderCharts()
    );
  }
}
