import React from 'react';
import ReactDOM from 'react-dom';
import StickyPallete from './sticky.js';
import Header from './header.js';
import About from './about.js';
import '../css/index.css';


class App extends React.Component {

	constructor(props){
		super(props);
		const hash = window.location.pathname.substring(1);
		const path = hash === "about/" ? "about" : "home";
		console.log(hash);
		this.state = {
			path: path
		}
		this.toggleMain = this.toggleMain.bind(this);
	}

	toggleMain(path){
		this.setState({
			path: path
		});
	}

	render() {
		const main = ( () => {
			if(this.state.path === "home"){
				window.history.pushState(null, null, "/");
				return <StickyPallete />
			}
			else if(this.state.path === "about"){
				window.history.pushState(null, null, "/about/");
				return <About />
			}
		} );
		return (
		<div className="app-body">
		<Header toggle={this.toggleMain} />
		{ main() }
		</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app-container'));
