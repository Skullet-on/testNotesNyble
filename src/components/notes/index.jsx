import React, {Component} from 'react';
import db from './data.json';
import Note from './note';

export default class Notes extends Component{
	constructor(props) {
		super(props);
		this.state = {
			notes: db,
			filter: ""
		}
    }
    handleFilter(e){
		this.setState({
			filter: e.target.value
		})
	}
	handleDelete(e){
		let arr = this.state.notes;
		arr.splice(e,1);
		this.setState({
			notes: arr
		})
	}
	handleEdit(e, item){
		let arr = this.state.notes;
		arr[item].note = e.target.value;
		this.setState({
			notes: arr
		})
	}/*
	getHashTags(inputText) {  
        var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        var matches = [];
        var match;
    
        while ((match = regex.exec(inputText))) {
            if (!matches.includes(match[1])) {
                matches.push(match[1]);
            }
        }
        return matches;
	}*/
	HandleAdd(e){
		let notes = this.state.notes;
		notes.push({
			note: "",
			tags: []
		})
		this.setState({
			notes: notes
		})
	}
	handleAddTag(e, item){
		let notes = this.state.notes;
		notes[item].tags.push(e);
		this.setState({
			notes: notes
		})
	}
	handleTagDelete(e, num, item){	
		let notes = this.state.notes;
		let tags = notes[item].tags;
		tags.splice(num,1);
		notes[item].tags = tags;
		this.setState({
			notes: notes
		})
	}
    list(){
		let list = this.state.notes.map((note, item) => {
			if(note.tags.some(note => note.includes(this.state.filter)) || !this.state.filter){
				return  <Note 
					key={item} 
					body={note.note} 
					tags={note.tags} 
					edit={e => this.handleEdit(e, item)} 
					onDelete={e => this.handleDelete(item)}
					addTag={e => this.handleAddTag(e, item)}
					tagClick={(e, num) => this.handleTagDelete(e, num, item)} />;
			};
			return false;
		})
		return list;
	}
	render(){
		return(
			<div className="notes">
				Filter: <input type="text" onChange={e => this.handleFilter(e)}/>
				<div className="notes_list">{ this.list() }</div>
				<input type="button" onClick={e => this.HandleAdd(e)} value="Add the note"/>
			</div>
		);
	}
}
