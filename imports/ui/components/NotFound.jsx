import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Button, Icon } from 'semantic-ui-react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading">
        <h3 className="circular">Route '{this.props.location.pathname}' is not defined.</h3>
        <Button
          icon={<Icon link as="span" className='fa fa-exclamation-triangle'/>}
          content='Go back'
          labelPosition='left'
          basic
          color='orange'
          className="logout animated fadeIn"
          onClick={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
