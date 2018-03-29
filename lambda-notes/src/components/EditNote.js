import React, { Component } from 'react';

class EditNote extends Component {
    state = {
        title: this.props.location.state.default.title,
        text: this.props.location.state.default.text,
        tags: this.props.location.state.default.tags,
        tagName: '',
        tagColor: '',
        showTag: false,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const currentState = { 
            title: this.state.title,
            text: this.state.text,
            tags: this.state.tags
        }
        this.props.edit(currentState, this.props.match.params.id);
        this.setState({ title: '', text: ''})
        this.props.history.push('/');
    }

    handleReveal = (e) => {
        e.preventDefault();
        if (this.state.showTag && this.state.tagColor && this.state.tagName) {
            const newTags = [...this.state.tags];
            newTags.push({ name: this.state.tagName, color: this.state.tagColor.toLowerCase() })
            this.setState({ showTag: !this.state.showTag, tagName: '', tagColor: '', tags: newTags})
        }
        else this.setState({ showTag: !this.state.showTag })    
    }

    handleDeleteTag = (e) => {
        let currentTags = this.state.tags;
        currentTags.splice(e.target.id, 1)
        this.setState({ tags: currentTags});
    }

    render() {
        const display = this.state.showTag ? {} : { visibility: "hidden" };
        return (
            <div className="EditNote">
                <h4 className="Title">Edit Note:</h4>
                <form className="Form">
                    <div className="AddNote__Tags">
                        <input className="Inputtext" type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                        {this.state.tags.length > 0 ? this.state.tags.map(((tag, index) => {
                                return (
                                    <div key={index} id={index} onClick={this.handleDeleteTag} className="Tag" style={ { background: `${tag.color}` } }>
                                        {tag.name}
                                    </div> 
                                )
                            })) 
                            : <div></div> }
                    </div>
                    <textarea className="Inputfield" type="textarea" name="text" value={this.state.text} onChange={this.handleChange}></textarea>
                    <div className="AddNote__Buttons">
                        <button className="Button" onClick={this.handleSubmit}>Update</button>
                        <button className="AddTag" onClick={this.handleReveal}>Add Tag</button>
                        <div className="AddTag__Input" style={display}>
                        <input type="text" name="tagName" placeholder="Name" value={this.state.tagName} onChange={this.handleChange}></input>
                            <input type="text" name="tagColor" placeholder="Color" value={this.state.tagColor} onChange={this.handleChange}></input>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditNote;