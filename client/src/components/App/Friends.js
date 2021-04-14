import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getFriendships,
    acceptFriendship,
    endFriendship,
    rejectFriendship,
    cancelFriendshipRequest,
} from "../../store/actions";
import FriendList from "./FriendList";

export default function Friends() {
    const dispatch = useDispatch();
    const { accepted, incoming, outgoing } = useSelector((state) => state);

    useEffect(() => dispatch(getFriendships()), []);

    function onClick(accepted, user) {
        if (accepted) {
            dispatch(endFriendship(user.id));
            return;
        }
        dispatch(acceptFriendship(user));
    }

    function onRejectClick(user) {
        const id = user.id;
        //console.log("[Dentro de onRejectClick]", user);
        dispatch(rejectFriendship(id));
    }

    function onCancelClick(user) {
        console.log("[Dentro de onCancelClick]", user);
        dispatch(cancelFriendshipRequest(user.id));
    }

    const noActivity = !accepted.length && !incoming.length && !outgoing.length;

    return (
        <section className="friends">
            <h2>Friends</h2>
            {noActivity ? (
                <p>No Activity yet</p>
            ) : (
                <>
                    <section className="incoming-list">
                        <h3>Pending requests</h3>
                        {incoming.length ? (
                            <>
                                <h4>Incoming Requests</h4>
                                <FriendList
                                    users={incoming}
                                    onClick={onClick}
                                    onRejectClick={onRejectClick}
                                />
                            </>
                        ) : (
                            <p>No incoming requests</p>
                        )}
                    </section>
                    <section className="outgoing-list">
                        {outgoing.length ? (
                            <>
                                <h4>Outgoing Requests</h4>
                                <FriendList
                                    users={outgoing}
                                    outgoing={true}
                                    onClick={onClick}
                                    onCancelClick={onCancelClick}
                                />
                            </>
                        ) : null}
                    </section>
                    <section className="current-list">
                        <h3>Current Friends</h3>
                        {accepted.length ? (
                            <FriendList users={accepted} onClick={onClick} />
                        ) : (
                            <p>
                                No friends yet.
                                <Link to={"/users"}>Look for more users</Link>
                            </p>
                        )}
                    </section>
                </>
            )}
        </section>
    );
}
