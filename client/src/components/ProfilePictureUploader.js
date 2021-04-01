import { Component } from "react";
import axios from "../axios";

class ProfilePictureUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isLoading: false,
        };
        this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();

        this.setState({ isLoading: true });

        const formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload-picture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                this.setState({ isLoading: false });
                this.props.onUpload(response.data.profilePicURL);
            });
    }

    onChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    onCloseButtonClick() {
        this.props.onClose();
    }
    render() {
        return (
            <div className="profile-picture-uploader modal">
                <div className="modal-content form">
                    <button className="close" onClick={this.onCloseButtonClick}>
                        x
                    </button>
                    <h2>Upload your profile picture</h2>
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="file"
                            name="file"
                            required
                            onChange={this.onChange}
                        />
                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProfilePictureUploader;
