import axios from "../axios";

export const GET_FRIENDSHIPS = "GET_FRIENDSHIPS";
export const ACCEPT_FRIENDSHIP = "ACCEPT_FRIENDSHIP";
export const END_FRIENDSHIP = "END_FRIENDSHIP";
export const REJECT_FRIENDSHIP = "REJECT_FRIENDSHIP";
export const CANCEL_FRIENDSHIP = "CANCEL_FRIENDSHIP";

export async function getFriendships() {
    const { data } = await axios.get("/api/friendships");
    return {
        type: GET_FRIENDSHIPS,
        friendships: data,
    };
}

export async function acceptFriendship({ user }) {
    const { data } = await axios.put(`/friendships/${user.id}`, {
        accepted: true,
    });
    return {
        type: ACCEPT_FRIENDSHIP,
        friendship: { ...data, user },
    };
}

export async function endFriendship(user_id) {
    console.log("dentro de action: ", user_id);
    await axios.delete(`/friendships/${user_id}`);
    return {
        type: END_FRIENDSHIP,
        user_id,
    };
}

export async function cancelFriendshipRequest(user_id) {
    console.log("dentro de action: ", user_id);
    await axios.delete(`/friendships/${user_id}`);
    return {
        type: CANCEL_FRIENDSHIP,
        user_id,
    };
}

export async function rejectFriendship(user_id) {
    await axios.delete(`/friendships/${user_id}`);
    return {
        type: REJECT_FRIENDSHIP,
        user_id,
    };
}
