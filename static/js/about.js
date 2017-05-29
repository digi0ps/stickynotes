import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import '../css/about.css';



function AboutLink(props){
	return <a target="blank" className="about-link" href={props.url}>{props.children}</a>
}



function AboutPara(props){
	return <p className="about-para">{props.children}</p>
}

class About extends React.Component {
	render(){
		return (
			<CSSTransitionGroup
			transitionName="sticky"
			transitionAppear={true}
			transitionAppearTimeout={400}
			transitionEnter={false}
			transitionLeave={false}>
			<div className="container">
			<div className="row about-box">
			<div className="about-header text-center">
			<h3 className="title-large">Stickies</h3>
			</div>
			<div className="about-body">
			<AboutPara>
			<span className="title-medium">Stickies</span> is a simple note creation web app. Just create a sticky note anywhere, anytime. No login/signup bullshit. All the notes are saved locally, nothing is sent to the server (ensuring 100% privacy).
			</AboutPara>
			<br />
			<AboutPara>
			Stickies uses <AboutLink url="https://facebook.github.io/react/">React</AboutLink> as the front-end framework coupled with <AboutLink url="https://www.djangoproject.com/">Django</AboutLink> in the backend.  <AboutLink url="">Webpack</AboutLink> is used for the bundling job with <AboutLink url="">Babel</AboutLink> for transpiling ES6 JS/JSX to ES5 code. I have used the WebStorage API to save all the notes in the browser.
			</AboutPara>
			<br />
			<AboutPara>
			You can view the source code of this app <AboutLink url="https://github.com/digi0ps/stickynotes">here</AboutLink>.
			Also, you can check my other projects <AboutLink url="https://github.com/digi0ps">here</AboutLink>.
			</AboutPara>
			<br />
			<AboutPara>
			~ <span className="sign">Sriram</span>
			</AboutPara>
			</div>
			</div>
			</div>
			</CSSTransitionGroup>
		);
	}
}

export default About;
