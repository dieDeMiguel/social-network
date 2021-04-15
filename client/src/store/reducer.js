import {
    GET_FRIENDSHIPS,
    ACCEPT_FRIENDSHIP,
    END_FRIENDSHIP,
    REJECT_FRIENDSHIP,
    CANCEL_FRIENDSHIP,
    GET_USER,
} from "./actions";

const defaultState = {
    accepted: [],
    incoming: [],
    outgoing: [],
    user: {},
};

function splitFriendships(friendships, userId) {
    const accepted = [];
    const incoming = [];
    const outgoing = [];
    friendships.forEach((x) => {
        console.log("dentro de forEach del reducer", x.accepted);
        if (x.accepted) {
            accepted.push(x);
            return;
        }
        if (x.sender_id === userId) {
            outgoing.push(x);
            return;
        }
        incoming.push(x);
    });
    return [accepted, incoming, outgoing];
}

export default function reducer(state = defaultState, action) {
    let nextState = state;
    if (action.type === GET_FRIENDSHIPS) {
        const [accepted, incoming, outgoing] = splitFriendships(
            action.friendships.data,
            action.friendships.userId
        );
        console.log("dentro de reducer outgoing", incoming);
        nextState = {
            ...state,
            accepted,
            incoming,
            outgoing,
        };
    }
    if (action.type === ACCEPT_FRIENDSHIP) {
        nextState = {
            ...state,
            accepted: [action.friendship, ...state.accepted],
            incoming: state.incoming.filter(
                (x) => x.user.id !== action.friendship.user.id
            ),
        };
    }
    if (action.type === END_FRIENDSHIP) {
        nextState = {
            ...state,
            accepted: state.accepted.filter(
                (x) => x.user.id !== action.user_id
            ),
        };
    }
    if (action.type === REJECT_FRIENDSHIP) {
        nextState = {
            ...state,
            incoming: state.incoming.filter(
                (x) => x.user.id !== action.user_id
            ),
        };
    }

    if (action.type === CANCEL_FRIENDSHIP) {
        nextState = {
            ...state,
            outgoing: state.incoming.filter(
                (x) => x.user.id !== action.user_id
            ),
        };
    }

    if (action.type === GET_USER) {
        nextState = {
            ...state,
            user: action.user.data,
        };
    }
    console.log("[redux-reducer] incoming action: ", {
        action,
        previousState: state,
        nextState,
    });
    return nextState;
}
