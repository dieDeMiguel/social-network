var spicedPg = require("spiced-pg");
const { genSalt, hash: bcryptHash } = require("bcryptjs");

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

module.exports = {
    getUserByID,
    createUser,
    updateUserPassword,
    getUserByEmail,
    getPasswordResetCodeByEmailAndCode,
    createPasswordResetCode,
    updateUserProfile,
};
