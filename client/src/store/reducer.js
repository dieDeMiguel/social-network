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
    let nextState = state;
    if (action.type === GET_FRIENDSHIPS) {
        const [accepted, incoming] = splitFriendships(action.friendships);
        nextState = {
            ...state,
            accepted,
            incoming,
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
    console.log("[redux-reducer] incoming action: ", {
        action,
        previousState: state,
        nextState,
    });
    return nextState;
}
