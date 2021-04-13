import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriendships,
    acceptFriendship,
    endFriendship,
    rejectFriendship,
} from "../../store/actions";
import FriendList from "./FriendList";

export default function Friends() {
    const dispatch = useDispatch();
    const { accepted, incoming } = useSelector((state) => state);

    useEffect(() => dispatch(getFriendships()), []);

    function onClick(accepted, user) {
        const id = user.id;
        if (accepted) {
            dispatch(endFriendship(user.id));
            return;
        }
        dispatch(acceptFriendship({ user }));
    }

    function onRejectClick(user) {
        const id = user.id;
        console.log("[Dentro de onClick]", user);
        dispatch(rejectFriendship(id));
    }

    const noActivity = !accepted.length && !incoming.length;

    return (
        <section className="friends">
            <h2>Friends</h2>
            {noActivity ? (
                <p>No Activity yet</p>
            ) : (
                <>
                    <section className="incoming-list">
                        <h3>Incoming requests</h3>
                        {incoming.length ? (
                            <FriendList
                                users={incoming}
                                onClick={onClick}
                                onRejectClick={onRejectClick}
                            />
                        ) : (
                            <p>No incoming requests</p>
                        )}
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
