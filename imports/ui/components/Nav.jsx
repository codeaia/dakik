import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export default class Nav extends Component {
  constructor(props) {
  	super(props);

    this.handleRoute = this.handleRoute.bind(this);
  }

  handleRoute(targetRoute){
    if (targetRoute !== this.props.location.pathname) {
      this.props.history.push(targetRoute);
    }
  }

  render() {
    return (
  		<Menu icon='labeled' compact className="navContainer">
        <Menu.Item
          as="div"
          className="navButton"
          name='timer'
          active={
            this.props.location.pathname === '/' ||
            this.props.location.pathname === '/taskNew' ||
            this.props.location.pathname === '/taskEdit' ||
          this.props.location.pathname === '/taskDetails' ? true : false}
          onClick={() => this.handleRoute('/')}>
          <Icon as="span" className='fa fa-clock-o' />
        </Menu.Item>
        <Menu.Item
          as="div"
          className="navButton"
          name='statistics'
          active={this.props.location.pathname === '/profile' ? true : false}
          onClick={() => this.handleRoute('/profile')}>
          <Icon as="span" className='fa fa-user-circle' />
        </Menu.Item>
        <Menu.Item as="div"
          className="navButton"
          name='settings'
          active={this.props.location.pathname === '/settings/account' ||
            this.props.location.pathname === '/settings/trello' ||
            this.props.location.pathname === '/settings/wunderlist'
          ? true : false}
          onClick={() => this.handleRoute('/settings/account')}>
          <Icon as="span" className='fa fa-cogs' />
        </Menu.Item>
        <Menu.Item
          as="div"
          className="navButton"
          name='about'
          active={this.props.location.pathname === '/about' ? true : false}
          onClick={() => this.handleRoute('/about')}>
          <Icon as="span" className='fa fa-info-circle' />
        </Menu.Item>
  		</Menu>
    );
  }
}
