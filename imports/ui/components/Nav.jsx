import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react'


export default class Nav extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
		activeItem: 'timer'
  	}
	this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }){
	this.setState({ activeItem: name });
  }

  render() {
    return (
		<Menu icon='labeled' compact className = "navContainer">
			<Link to="/">
		        <Menu.Item className = "navButton" name='timer' active={this.state.activeItem === 'timer'} onClick={this.handleItemClick}>
		          <Icon as="span" className='fa fa-clock-o' />
		        </Menu.Item>
			</Link>

 			<Link to="/profile">
		        <Menu.Item className = "navButton" name='statistics' active={this.state.activeItem === 'statistics'} onClick={this.handleItemClick}>
		          <Icon as="span" className='fa fa-user-circle' />
		        </Menu.Item>
			</Link>

 			<Link to="/settings">
		        <Menu.Item className = "navButton" name='settings' active={this.state.activeItem === 'settings'} onClick={this.handleItemClick}>
		          <Icon as="span" className='fa fa-cog' />
		        </Menu.Item>
			</Link>


 			<Link to="/about">
				<Menu.Item className = "navButton" name='about' active={this.state.activeItem === 'about'} onClick={this.handleItemClick}>
			  	<Icon as="span" className='fa fa-info-circle' />
			    </Menu.Item>
			</Link>
		</Menu>
    );
  }
}
