import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FriendButton({ id, showBioProfile }) {
    const [buttonText, setButtonText] = useState("Send request");
    const [existing, setExisting] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [incoming, setIncoming] = useState(false);

    useEffect(() => {
        axios
            .get(`/friendships/${id}`)
            .then((response) => {
                setExisting(true);
                setAccepted(response.data.accepted);
                setIncoming(response.data.sender_id === parseInt(id));
            })
            .catch((error) => {
                console.log("[FriendButton] catch", error);
                if (error.response.status === 404) {
                    console.log(
                        "[FriendButton] users have no friendship entry in DB",
                        error
                    );
                    console.log(
                        "[FriendButton] error fetching friendship",
                        error
                    );
                }
            });
    }, [id]);

    useEffect(() => {
        if (!existing) {
            setButtonText("Send request");
            return;
        }
        if (accepted) {
            setButtonText("Unfriend");
            showBioProfile();
            return;
        }
        if (incoming) {
            setButtonText("Accept request");
            return;
        }
        setButtonText("Cancel request");
    }, [existing, accepted, incoming]);

    function onClick() {
        if (!existing) {
            axios
                .post(`/friendships`, { recipient_id: id })
                .then((response) => {
                    console.log(
                        "[FriendButton] friendship created",
                        response.data
                    );
                    setExisting(true);
                    setAccepted(false);
                    setIncoming(false);
                });
            return;
        }
        if (!incoming) {
            //loggd user sent the request
            axios.delete(`/friendships/${id}`).then((response) => {
                console.log("[FriendButton] friendship deleted", response.data);
                setExisting(false);
                setAccepted(false);
                setIncoming(false);
            });
            return;
        }
        if (!accepted) {
            //logged user received the request
            axios
                .put(`/friendships/${id}`, { accepted: true })
                .then((response) => {
                    setExisting(true);
                    setAccepted(response.data.accepted);
                    setIncoming(false);
                });
            return;
        }
        axios.delete(`/friendships/${id}`).then((response) => {
            console.log("[FriendButton] friendship deleted", response.data);
            setExisting(false);
            setAccepted(false);
            setIncoming(false);
        });
    }

    function onRejectButton() {
        axios.delete(`/friendships/${id}`).then((response) => {
            console.log("[FriendButton] friendship rejected", response.data);
            setExisting(false);
            setAccepted(false);
            setIncoming(false);
        });
    }

    const showRejectButton = incoming && !accepted;

    return (
        <div>
            <button onClick={onClick} id="btn">
                {buttonText}
            </button>
            <br></br>
            {showRejectButton && (
                <button onClick={onRejectButton} id="btn">
                    Reject request
                </button>
            )}
        </div>
    );
}
