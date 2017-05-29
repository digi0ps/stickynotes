import React from 'react';
import ReactDOM from 'react-dom';
import StickyPallete from './sticky.js';
import Header from './header.js';
import About from './about.js';
import '../css/index.css';


class App extends React.Component {
	render() {
		return (
		<div className="app-body">
		<Header />
		<About />
		</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app-container'));
