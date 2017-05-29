import React from 'react';
import ReactDOM from 'react-dom';
import StickyPallete from './sticky.js';

class HelloWorld extends React.Component {
	render() {
		return (
		<div className="hello">
		<center>
		<h1>Hello, Sticky Notes</h1>
		</center>
		</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
		<div className="app-body">
		<HelloWorld />
		<StickyPallete />
		</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app-container'));
