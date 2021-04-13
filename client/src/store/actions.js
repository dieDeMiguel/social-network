import axios from "../axios";

export const GET_FRIENDSHIPS = "GET_FRIENDSHIPS";
export const ACCEPT_FRIENDSHIP = "ACCEPT_FRIENDSHIP";
export const END_FRIENDSHIP = "END_FRIENDSHIP";

export async function getFriendships() {
    const { data } = await axios.get("/api/friendships");
    console.log("dentro de actions.js, data", data);
    return {
        type: GET_FRIENDSHIPS,
        friendships: data,
    };
}

export async function acceptFriendship(id) {
    const { data } = await axios.put(`/friendships/${id}`, { accepted: true });
    return {
        type: ACCEPT_FRIENDSHIP,
        friendship: { ...data, user },
    };
}

export async function endFriendship(user_id) {
    await axios.delete(`/friendships/${user_id}`);
    return {
        type: END_FRIENDSHIP,
        user_id,
    };
}
