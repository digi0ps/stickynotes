import React from 'react';


class Header extends React.Component {
	render() {
		return (
		<nav className="navbar navbar-inverse header">
		  <div className="container-fluid">
		    <div className="navbar-header top-mar">
		      <a className="navbar-brand" href="" onClick={(e)=> {e.preventDefault(); this.props.toggle("home");}}>Stickies</a>
		    </div>
		    <ul className="nav navbar-nav navbar-right top-mar">
		      <li><a href="" onClick={(e)=> {e.preventDefault(); this.props.toggle("about");}}>About<span className="title-small"> Stickies</span></a></li>
		    </ul>
		  </div>
		</nav>
		);
	}
}

export default Header;
