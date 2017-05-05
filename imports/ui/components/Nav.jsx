import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

export default class Nav extends Component {
  constructor(props) {
  	super(props);
  }

  render() {
    return (
  		<Menu icon='labeled' compact className="navContainer">
  			<Link to="/">
          <Menu.Item as="div" className="navButton" name='timer' active={this.props.location.pathname === '/' ? true : false}>
            <Icon as="span" className='fa fa-clock-o' />
          </Menu.Item>
  			</Link>
   			<Link to="/profile">
  		    <Menu.Item as="div" className="navButton" name='statistics' active={this.props.location.pathname === '/profile' ? true : false}>
  		      <Icon as="span" className='fa fa-user-circle' />
  		    </Menu.Item>
  			</Link>
   			<Link to="/settings/account">
  		    <Menu.Item as="div"
            className="navButton"
            name='settings'
            active={this.props.location.pathname === '/settings/account' ||
            this.props.location.pathname === '/settings/trello' ||
            this.props.location.pathname === '/settings/wunderlist'
            ? true : false}>
  		      <Icon as="span" className='fa fa-cogs' />
  		    </Menu.Item>
  			</Link>
   			<Link to="/about">
  				<Menu.Item as="div" className="navButton" name='about' active={this.props.location.pathname === '/about' ? true : false}>
  			  	<Icon as="span" className='fa fa-info-circle' />
  			  </Menu.Item>
  		  </Link>
  		</Menu>
    );
  }
}
