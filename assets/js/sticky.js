import React from 'react';
import TimeAgo from 'react-timeago';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import '../css/sticky.css';
import del from '../svg/delete-icon.svg';
import done from '../svg/done-icon.svg';

// Local Storage Key
const KEY = "sticky";
// Max characters per note
const MAX = 170;
// Functions to store and retrieve object from the localStorage
const store = window.localStorage;
const get = (name) => store.getItem(name);
const set = (name, value) => store.setItem(name, value);
const splitter = "~;", divider = "~";

//Object constructor for Note objects
function Note(id, note, time){
	this.id = id;
	this.note = note;
	this.time = time;
}

//Retrieve all the stickies from the local Storage
const rawToState = () => {
	let sticky = get(KEY);
	if (sticky === null)
		return [];
	sticky = sticky.split(splitter);
	sticky.pop();
	// eslint-disable-next-line
	sticky  = sticky.map((item) => {
		const raw_arr = item.split(divider);
		const note = new Note(...raw_arr);
		return note;
	});
	return sticky;
	// now sticky is an array of arrays
	// [key, note, date]
}

//Convert all the state objects to storage strings
const stateToRaw = (notes) => {
	// notes -> array of Note objects
	let raw_arr, raw;
	raw_arr = notes.map((note) => {
		let stick = `${note.id}~${note.note}~${note.time}~;`;
		return stick;
	});
	raw = raw_arr.join("");
	return raw;
}

// BOTTOM UP APPROACH



function DoneButton(props) {
	if (props.showDone){
		return (
			<div className="bottomBar">
			<CSSTransitionGroup
			transitionName="done"
			transitionAppear={true}
			transitionAppearTimeout={500}
			transitionEnter={false}
			transitionLeave={false}>
			<button key={1} className="done-btn" onClick={() => props.handler()}>
			<img src={done} alt="done" className="done-icon" />
			</button>
			</CSSTransitionGroup>
			</div>
		);
	}
	else
		return (
			<div className="bottomBar">
			</div>
		)

}



class StickyNew extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			showDone: false
		}
		this.handler = this.handler.bind(this);
		this.toggleBlur = this.toggleBlur.bind(this);
	}

	toggleBlur(){
		const s = this.state.showDone? false: true;
		this.setState({showDone:s});
	}

	handler(e=null){
		this.toggleBlur();
		let value = this.refs.newSticky.value;
		// Format the string
		value = value.split("\n").join(" ").trim();
		//Exit if emtpy
		if (value.length === 0)
			return;
		//current stickies length
		const id = this.props.last + 1;
		let newStick = `${id}~${value}~${Date.now()}~;`;

		const existing = get(KEY);
		if (existing === "null"){
			set(KEY, newStick);
		}

		else {
		const stickies = get(KEY) + newStick;
		set(KEY, stickies);	
		}
		e.target.value="";
		this.props.addNewSticky(id);
	}

	render(){
		return (
		<div className="sticky-input sticky-root bounceIn col-xs-8 col-sm-3 col-md-3 col-xs-offset-2">
		<textarea ref="newSticky" maxLength={MAX} placeholder="Create a new sticky note" onBlur={(e) => this.handler(e)} onFocus={this.toggleBlur}/>
		<DoneButton showDone={this.state.showDone} handler={this.handler}/>
		</div>
		);
	}
}



function StickyDelete(props){
	return (
		<button className="delete-btn" onClick={(e) => props.handler(props.id)}>
		<img src={del} className="delete-icon" alt="delete" /></button>
	);
}



class StickyNote extends React.Component {
	constructor(props){
		super(props);
		this.saveEdit = this.saveEdit.bind(this);
	}

	saveEdit(){
		const id = this.refs.edited.id;
		const newNote = this.refs.edited.value;
		this.props.saveEdit(id, newNote);
	}

	render() {
		const sticky = this.props.sticky;
		// Posted time in milliseconds
		const stickyTime = parseInt(sticky.time, 10);

		return (
			<div className="sticky-note">
			<div className="note-text">
			<textarea ref="edited" onBlur={this.saveEdit} id={sticky.id} defaultValue={sticky.note} className="textarea" maxLength={MAX} />
			</div>
			<div className="bottomBar">
			<small className="time"> <TimeAgo date={stickyTime} /> </small>
			<StickyDelete handler={this.props.deleteNote} id={sticky.id}/>
			</div>
			</div>
		);
	}
}


// eslint-disable-next-line
function StickyDeleteAll(props){
	return (
		<button className="delete-all" onClick={props.handler}>Delete all</button>
	);
}



class StickyPallete extends React.Component {

	constructor(props){
		super(props);
		const stickies = rawToState();
		const lastId = this.findMaxId(stickies);
		this.state = {
			stickies: stickies,
			lastId: lastId
		}
		this.refresh = this.refresh.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.saveEditedNote = this.saveEditedNote.bind(this);
	}

	componentDidMount(){
		window.history.pushState(null, null, "/sticky")
	}

	findMaxId(stickies){
		if (!stickies.length)
			return 0;
		const ids = stickies.map((note) => parseInt(note.id, 10));
		const maxId = Math.max(...ids);
		return maxId;
	}

	refresh(id = -1){
		const stickies = rawToState();
		let lastId = this.state.lastId;
		if (id !== -1){
			lastId = id;
		}
		this.setState({stickies: stickies,
			lastId: lastId});
	}

	deleteAll(){
		set(KEY, null);
		this.refresh(0);
	}

	deleteNote(id){
		let stickies = this.state.stickies.slice();
		const test = (note) => {
			if (note.id === id)
				return note;
		}
		let index = stickies.findIndex(test);
		stickies.splice(index, 1);
		const raw = stateToRaw(stickies);
		set(KEY, raw);
		this.refresh();
	}

	saveEditedNote(id, edited){
		let stickies = this.state.stickies.slice();
		const test = (note) => {
			if (note.id === id)
				return note;
		}
		let index = stickies.findIndex(test);
		if(stickies[index].note.trim() === edited)
			return;
		stickies[index].note = edited;
		stickies[index].time = Date.now();
		const raw = stateToRaw(stickies);
		set(KEY, raw);
		this.refresh();
	}

	renderStickies(){
		let stickies = this.state.stickies.slice().reverse();
		let stickyElements = stickies.map((sticky, i) => {
			let id = sticky.id;
			return (
				<div key={"root"+id} className="sticky-root animated bounceIn infinite col-xs-8 col-sm-3 col-md-3 col-xs-offset-2" id={id}>
				<StickyNote id={id} key={"sticky"+id} sticky={sticky} saveEdit={this.saveEditedNote} deleteNote={this.deleteNote}/>
				</div>
				);
		});
		return stickyElements
	}

	render() {
		const stickies = this.state.stickies;
		stateToRaw(stickies);
		return (
			<div className="stickyBody container">
			<div className="stickyHeader">
			<h1> Sticky Notes </h1>
			{/* <StickyDeleteAll handler={this.deleteAll} />*/}
			</div>
			<div className="sticky-container row">
				<CSSTransitionGroup
				transitionName="sticky"
				transitionAppear={true}
				transitionAppearTimeout={500}
          		transitionEnterTimeout={600}
          		transitionLeaveTimeout={400}>
				<StickyNew key="root0" last={this.state.lastId} addNewSticky={this.refresh} />
				{this.renderStickies()}
				</CSSTransitionGroup>
			</div>
			</div>
		);
	}
}

export default StickyPallete;
