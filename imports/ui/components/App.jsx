import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
import { createContainer } from 'meteor/react-meteor-data';

import Timer from './Timer.jsx';
import TaskViewContainer from './TaskView.jsx';
import StatisticsContainer from './Statistics.jsx';
import Settings from './Settings.jsx';
import About from './About.jsx';
import Loading from './Loading.jsx';
import TaskNew from './TaskNew.jsx';
import IntegrationAuth from './IntegrationAuth.jsx';
import Profile from './Profile.jsx';
import Nav from './Nav.jsx';
import Chat from './Chat.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	if (Meteor.user()) {
  	  if (this.props.route === 'timer') {
    		return (
    			<Flexbox flexDirection='column'>
    				<Nav/>
            <Flexbox flexDirection='column' className='timerContainer'>
                <Timer />
    			  	<TaskViewContainer />
            </Flexbox>
    			</Flexbox>
    		);
  	  } else if(this.props.route === 'statistics') {
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav />
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <Profile />
              <StatisticsContainer />
            </Flexbox>
    		  </Flexbox>
    		);
  	  } else if(this.props.route === 'settings'){
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav />
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <IntegrationAuth />
              <Settings />
            </Flexbox>
    		  </Flexbox>
    		);
  	  } else if(this.props.route === 'taskNew'){
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav />
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <TaskNew />
            </Flexbox>
    		  </Flexbox>
    		);
  	  } else if(this.props.route === 'about'){
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav />
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <About />
            </Flexbox>
    		  </Flexbox>
    		);
  	  }
  	} else {
    	return (
        <Loading/>
    	);
  	}
  }
}

export default AppContainer = createContainer(() => {
  const user = Meteor.user();
  const route = Session.get('route');

  return {
    route,
  };
}, App);
