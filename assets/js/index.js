import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
	render() {
		return (
		<h1>Hello, Django</h1>
		);
	}
}

class App extends React.Component {
	render() {
		return (
		<HelloWorld />
		);
	}
}

ReactDOM.render(<HelloWorld />, document.getElementById('app-container'));
