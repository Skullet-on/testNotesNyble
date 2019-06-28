import React, {Component} from 'react';
import Hashtags from './hashtags';

export default class Note extends Component{
    constructor(props) {
		super(props);
		this.state = {
            edit: false,
            editTag: true,
            tagvalue: "",
            body: this.props.body
		}
    }
    handleSwitch(e){
        this.setState({
            edit: !this.state.edit
        })
    }
    handleDelete(e){
        this.props.onDelete(e);
    }
    handleEdit(e){
        this.props.edit(e);
    }
    tagList(){
		let list = this.props.tags.map((tag, item) =>{ 
			return  <Hashtags key={item} tag={tag} click={e => this.props.tagClick(e, item)} />;
		})
		return list;
    }
    handleAddTag(e){
        this.props.addTag(this.state.tagvalue);
        this.setState({
            editTag: !this.state.editTag,
            tagvalue: ""
        })
    }
    handleEditValue(e){
        this.setState({
            tagvalue: e.target.value
        })
    }
    handleAdd(e){
        this.setState({
            editTag: !this.state.editTag
        })
    }
    highlight(){
        let text = this.props.body;
        let words = this.props.tags;
        words.some(tag => {
            var re = new RegExp(tag,"g");
            text = text.replace(re, '<span class="text_red">'+tag+'</span>');
        })
        const danger_dom = <div dangerouslySetInnerHTML={{__html: text}}/>
        const dom = <div>{danger_dom}</div>
        return dom;
    }
	render(){
		return (
		<div className="note">
            <div className="note_menu"><input type="button" onClick={e => this.handleSwitch(e)} value="edit"/><input type="button" onClick={e => this.handleDelete(e)} value="delete"/></div>
			<div className="note_body">
                { this.state.edit ? <textarea onChange={e => this.handleEdit(e)} onBlur={e => this.props.findTag(e)} className="text_body" rows="10">{this.props.body}</textarea> : <div className="text_body">{this.highlight()}</div> }
			</div>
			<div className="note_hashtags">
                { this.tagList() }
                <input type="text" hidden={this.state.editTag} value={this.state.tagvalue} onChange={e => this.handleEditValue(e)} />
                <input type="button" hidden={!this.state.editTag} value="+" onClick={e => this.handleAdd(e)} />
                <input type="button" onClick={e => this.handleAddTag(e)} hidden={this.state.editTag} value="Confirm" />
			</div>
		</div>
		)
	}
}
