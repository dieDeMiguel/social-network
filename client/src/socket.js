import { getChatMessages, incomingMessage } from "./store/actions";
import io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (socket) {
        return;
    }

    socket = io.connect();

    socket.on("chatMessages", (msgs) => store.dispatch(getChatMessages(msgs)));

    socket.on("chatMessage", (msg) => store.dispatch(incomingMessage(msg)));
};
