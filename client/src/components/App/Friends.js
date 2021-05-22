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
        dispatch(rejectFriendship(id));
    }

    function onCancelClick(user) {
        console.log("[Dentro de onCancelClick]", user);
        dispatch(cancelFriendshipRequest(user.id));
    }

    const noActivity = !accepted.length && !incoming.length && !outgoing.length;

    return (
        <section className="friends" style={{ color: "black" }}>
            <h3>Your friendship activity:</h3>
            {noActivity ? (
                <p>
                    No incoming/outgoing friendships requests and no current
                    friendships yet.
                </p>
            ) : (
                <>
                    <section className="">
                        {incoming.length ? (
                            <>
                                <h3>Incoming Requests</h3>
                                <FriendList
                                    users={incoming}
                                    onClick={onClick}
                                    onRejectClick={onRejectClick}
                                />
                            </>
                        ) : (
                            <p style={{ gridColumnStart: "2" }}>
                                No incoming requests
                            </p>
                        )}
                    </section>
                    <section className="">
                        {outgoing.length ? (
                            <>
                                <h5 style={{ gridColumnStart: "2" }}>
                                    Outgoing Requests
                                </h5>
                                <FriendList
                                    users={outgoing}
                                    outgoing={true}
                                    onClick={onClick}
                                    onCancelClick={onCancelClick}
                                />
                            </>
                        ) : null}
                    </section>
                    <section className="">
                        <h5>Current Friends</h5>
                        {accepted.length ? (
                            <FriendList users={accepted} onClick={onClick} />
                        ) : (
                            <p>
                                No friends yet.
                                <Link to={"/users"}> Look for more users</Link>
                            </p>
                        )}
                    </section>
                </>
            )}
        </section>
    );
}
