import { Component } from "react";

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftText: "",
            isEditing: false,
        };

        this.onTextAreaInput = this.onTextAreaInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editBio = this.editBio.bind(this);
    }

    onTextAreaInput(event) {
        console.log("[TextEditor] onTextChange", event.target.value);
        this.setState({
            draftText: event.target.value,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("[TextEditor] onSubmit", this.state.draftText);
        this.props.onTextSave(this.state.draftText);
        this.setState({ isEditing: false });
    }

    editBio() {
        this.setState({ isEditing: true });
    }

    render() {
        return (
            <div>
                {this.state.isEditing
                    ? this.renderEditingMode()
                    : this.renderDisplayMode()}
            </div>
        );
    }

    renderDisplayMode() {
        const buttonLabel = this.props.text ? "Edit Bio" : "Add bio";
        const textContent = this.props.text ? this.props.text : "No bio yet";
        return (
            <>
                <p className="profile-text">Your Profile:</p>
                <h1 className="bio-text">{textContent}</h1>
                <button onClick={this.editBio} id="btn">
                    {buttonLabel}
                </button>
            </>
        );
    }

    renderEditingMode() {
        return (
            <form onSubmit={this.onSubmit}>
                <textarea
                    rows={5}
                    cols={40}
                    onInput={this.onTextAreaInput}
                    defaultValue={this.props.text}
                    required
                />
                <button type="submit" id="btn">
                    Save Text
                </button>
            </form>
        );
    }
}

export default BioEditor;
