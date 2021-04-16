import ChatMessage from "./ChatMessage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const [inputText, setInputText] = useState("");
    const { chatMessages } = useSelector((state) => state);
    console.log("chat.js chatMessages", chatMessages);
    function onInput(event) {
        setInputText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        socket.emit("newChatMessage");
        setInputText("");
        setTextareaText("");
    }
    return (
        <div className="chat-wrapper">
            <div className="centered-chat">
                <div className="chat">
                    <ul className="message-list">
                        {chatMessages.map((user) => {})}
                    </ul>
                </div>
                <form onSubmit={onSubmit} className="chat-form">
                    <textarea
                        rows={5}
                        cols={30}
                        onInput={onInput}
                        value={inputText}
                        placeholder="Write your message"
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
