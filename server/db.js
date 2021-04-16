var spicedPg = require("spiced-pg");
const { genSalt, hash: bcryptHash } = require("bcryptjs");
function serializeUser(usersList) {
    return {
        id: usersList.id,
        firstName: usersList.first_name,
        lastName: usersList.last_name,
        profilePicURL: usersList.profilePicURL,
    };
}

function hash(password) {
    return genSalt().then((salt) => bcryptHash(password, salt));
}

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const { username, password, database } = require("../secrets.json");
    return `postgres:${username}:${password}@localhost:5432/${database}`;
}

const db = spicedPg(getDatabaseURL());

function createUser({ firstName, lastName, email, password }) {
    return hash(password).then((password_hash) =>
        db
            .query(
                "INSERT INTO users(first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id",
                [firstName, lastName, email, password_hash]
            )
            .then((result) => result.rows[0].id)
    );
}

function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => result.rows[0]);
}

function updateUserPassword({ email, password }) {
    return hash(password).then((password_hash) => {
        return db.query(
            `UPDATE users
            SET password_hash = $1
            WHERE email = $2`,
            [password_hash, email]
        );
    });
}

function createPasswordResetCode({ email, code }) {
    return db
        .query(
            `INSERT INTO password_reset_codes(email, code) VALUES ($1, $2) RETURNING *`,
            [email, code]
        )
        .then((result) => result.rows[0]);
}

function getPasswordResetCodeByEmailAndCode({ email, code }) {
    return db
        .query(
            `SELECT * FROM password_reset_codes
            WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
            AND email = $1
            AND code = $2`,
            [email, code]
        )
        .then((result) => result.rows[0]);
}

function getUserByID({ userId }) {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [userId])
        .then((results) => results.rows[0]);
}

function updateUserProfile({ userId, profilePicURL }) {
    return db.query(`UPDATE users SET profile_url = $1 WHERE id = $2`, [
        profilePicURL,
        userId,
    ]);
}

function updateUserBio({ userId, bioText }) {
    return db
        .query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING *`, [
            bioText,
            userId,
        ])
        .then((result) => result.rows[0]);
}

function getMoreRecentUsers(count) {
    return db
        .query(`SELECT * FROM users ORDER BY id DESC LIMIT $1`, [count || 3])
        .then((results) => results.rows);
}

function searchUsers(query) {
    return db
        .query(
            `SELECT * FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1;`,
            [query + "%"]
        )
        .then((results) => results.rows);
}

function getFriendship({ first_id, second_id }) {
    return db
        .query(
            `SELECT * FROM friendships WHERE sender_id = $1 AND recipient_id = $2 OR sender_id = $2 AND recipient_id = $1`,
            [first_id, second_id]
        )
        .then((results) => {
            return results.rows[0];
        });
}

function createFriendship({ sender_id, recipient_id }) {
    return db
        .query(
            `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *`,
            [sender_id, recipient_id]
        )
        .then((results) => results.rows[0]);
}

function updateFriendship({ sender_id, recipient_id, accepted }) {
    return db
        .query(
            `UPDATE friendships SET accepted = $1 WHERE sender_id = $2 AND recipient_id = $3 RETURNING *`,
            [accepted, sender_id, recipient_id]
        )
        .then((results) => results.rows[0]);
}

function deleteFriendship({ first_id, second_id }) {
    return db.query(
        `DELETE FROM friendships WHERE sender_id = $1 AND recipient_id = $2 OR sender_id = $2 AND recipient_id = $1`,
        [first_id, second_id]
    );
}

function getFriendships(userId) {
    return db
        .query(
            `SELECT users.id, first_name, last_name, profile_url, accepted, sender_id, recipient_id 
        FROM friendships 
        JOIN users
        ON (accepted = false AND sender_id = $1 AND recipient_id = users.id)
        OR (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,
            [userId]
        )
        .then((result) => {
            return result.rows.map(
                ({ id, first_name, last_name, profile_url, ...rest }) => {
                    return {
                        ...rest,
                        user: {
                            id,
                            first_name,
                            last_name,
                            profile_url,
                        },
                    };
                }
            );
        });
}

function getChatMessages(limit = 10) {
    return db
        .query(
            `SELECT users.id AS user_id, chat_messages.id AS message_id, message, first_name AS firstName, last_name AS lastName, profile_url
        FROM chat_messages 
        JOIN users
        ON users.id = chat_messages.sender_id
        ORDER BY chat_messages.created_at DESC LIMIT $1`,
            [limit]
        )
        .then((results) =>
            results.rows
                .reverse()
                .map(({ firstname, lastname, profile_url, ...rest }) => ({
                    firstName: firstname,
                    lastName: lastname,
                    profilePicURL: profile_url,
                    ...rest,
                }))
        );
}

function savedChatMessage({ message, sender_id }) {
    return db
        .query(
            `INSERT INTO chat_messages (message, sender_id) VALUES ($1, $2) RETURNING *`,
            [message, sender_id]
        )
        .then((result) => result.rows[0]);
}

module.exports = {
    getChatMessages,
    savedChatMessage,
    getFriendships,
    getFriendship,
    createFriendship,
    updateFriendship,
    deleteFriendship,
    searchUsers,
    getMoreRecentUsers,
    getUserByID,
    createUser,
    updateUserPassword,
    getUserByEmail,
    getPasswordResetCodeByEmailAndCode,
    createPasswordResetCode,
    updateUserProfile,
    updateUserBio,
};
