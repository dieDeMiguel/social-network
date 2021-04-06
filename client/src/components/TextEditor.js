import { Component } from "react";

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftText: "",
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onTextChange(event) {
        console.log("[TextEditor] onTextChange", event.target.value);
        this.setState({
            draftText: event.target.value,
        });
    }
    onSubmit(event) {
        event.preventDefault();
        console.log("[TextEditor] onSubmit", this.state.draftText);
        this.props.onTextSave(this.state.draftText);
    }
    render() {
        return (
            <form className="text-editor" onSubmit={this.onSubmit}>
                <p className="original-text">
                    <strong>Original text:</strong> {this.props.text}
                </p>
                <input type="text" onChange={this.onTextChange} required />
                <button type="submit">Save Text</button>
            </form>
        );
    }
}

export default TextEditor;
