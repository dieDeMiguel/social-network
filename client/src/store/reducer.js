import { GET_FRIENDSHIPS, ACCEPT_FRIENDSHIP, END_FRIENDSHIP } from "./actions";

const defaultState = {
    accepted: [],
    incoming: [],
};

function splitFriendships(friendships) {
    const accepted = [];
    const incoming = [];
    friendships.forEach((x) => {
        if (x.accepted) {
            accepted.push(x);
            return;
        }
        incoming.push(x);
    });
    return [accepted, incoming];
}

export default function reducer(state = defaultState) {
    return state;
}
