import React, { Component } from 'react'

export default class Hashtags extends Component {
    render() {
        return (
        <div className="tag">
           #{this.props.tag.toLowerCase()}
           <input className="tag_button" type="button" onClick={e => this.props.click(this.props.tag)} value="-"/>
        </div>
        )
    }
}
