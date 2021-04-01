import { Component } from "react";
import axios from "../axios";

class ProfilePictureUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        // refer to the imageboard project for all the FormData stuff
        axios
            .post("/upload_profile", ...)
            .then((response) => {
                // call this.props.onUpload with the right information from the response
            });
    }
    onChange(event) {
        this.setState({ file: event.target.files[0] });
    }
    render() {
        return (
            <div className="profile-picture-uploader modal">
                <div className="modal-content form">
                    {/* // here you will put:
                    // a <button> that calls this.props.onClose when it is clicked

                    // a <form> that calls this.onSubmit when submit
                    // with an <input type="file"> that sets this.state.file onChange */}
                </div>
            </div>
        );
    }
}

export default ProfilePictureUploader;