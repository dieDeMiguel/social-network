import ChatMessage from "./ChatMessage";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";

export default function Chat() {
    const [inputText, setInputText] = useState("");
    const { chatMessages } = useSelector((state) => state);

    useEffect(() => {
        if (!chatMessages.length) {
            return;
        }
        const listElement = messagesListRef.current;
        listElement.scrollTop =
            listElement.scrollHeight - listElement.clientHeight;
    }, [chatMessages]);

    const messagesListRef = useRef();

    function onInput(event) {
        setInputText(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        socket.emit("newChatMessage", inputText);
        setInputText("");
    }

    return (
        <div className="chat-wrapper">
            <div className="centered-chat">
                <div className="chat">
                    {chatMessages ? (
                        <ul className="message-list" ref={messagesListRef}>
                            {chatMessages.map((userMessage) => {
                                return (
                                    <ChatMessage
                                        key={userMessage.message_id}
                                        {...userMessage}
                                    />
                                );
                            })}
                        </ul>
                    ) : (
                        <p>no messages yet</p>
                    )}
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
