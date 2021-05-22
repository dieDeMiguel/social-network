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
        this.setState({
            draftText: event.target.value,
        });
    }

    onSubmit(event) {
        event.preventDefault();
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
                <h1 style={{ fontSize: "1rem" }}>{textContent}</h1>
                <button onClick={this.editBio} id="btn">
                    <p style={{ fontSize: "1rem" }}>{buttonLabel}</p>
                </button>
            </>
        );
    }

    renderEditingMode() {
        return (
            <form onSubmit={this.onSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <textarea
                    rows={5}
                    cols={40}
                    onInput={this.onTextAreaInput}
                    defaultValue={this.props.text}
                    style={{ border: "1px solid black" }}
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
