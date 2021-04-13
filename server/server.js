//Dependencies
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const { compare } = require("bcryptjs");
const cookieSession = require("cookie-session");
const { uploader } = require("./upload");
const {
    getUserByID,
    createUser,
    getUserByEmail,
    createPasswordResetCode,
    getPasswordResetCodeByEmailAndCode,
    updateUserPassword,
    updateUserProfile,
    updateUserBio,
    searchUsers,
    getMoreRecentUsers,
    getFriendship,
    createFriendship,
    updateFriendship,
    deleteFriendship,
    getFriendships,
} = require("./db");
const cryptoRandomString = require("crypto-random-string");
const { s3upload, getURLFromFilename } = require("../s3");
const { Bucket } = require("../config.json");
const { ses } = require("../email");

//Middlewares
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());
app.use(
    cookieSession({
        secret: "Life is bad",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("social-network-token", req.csrfToken());
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

//Filter functions
function serializeUser(usersList) {
    let _arr = [];
    !Array.isArray(usersList) ? _arr.push(usersList) : (_arr = usersList);
    let _result = _arr.map(function (user) {
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            profile_url: user.profile_url,
            bio: user.bio,
        };
    });
    return _result;
}

//Routing
app.post("/login", (request, response) => {
    const { email, password } = request.body;
    let error;
    if (!email || !password) {
        response.statusCode = 400;
        response.json({
            message: "You need to write email and password",
        });
        return;
    }
    getUserByEmail(email)
        .then((user) => {
            if (!user) {
                response.statusCode = 400;
                console.log("login error");
                response.json({
                    message: "login error",
                });
                return;
            }
            compare(password, user.password_hash).then((match) => {
                if (!match) {
                    response.statusCode = 400;
                    console.log("login error: wrong password");
                    response.json({
                        message: "login error",
                    });
                    return;
                }
                request.session.userId = user.id;
                response.json({
                    message: "succes",
                    userId: user.id,
                });
            });
        })
        .catch((error) => console.log("error.constraint", error.constraint));
});

app.post("/users", (request, response) => {
    createUser({ ...request.body })
        .then((createdUser) => {
            console.log("[server] User created", createdUser);
            request.session.userId = createdUser;
            response.json({
                createdUser,
            });
        })
        .catch((error) => {
            if (error.constraint === "users_email_key") {
                response.statusCode = 400;
                console.log("[Server.js] createUser error", error);
                response.json({
                    message: "Email taken",
                });
                return;
            }
            response.statusCode = 500;
            console.log("[Server.js] createUser error statusCode 500", error);
            response.json({
                message: "Error while creating user",
            });
        });
});

app.get("/api/users/:user_id", function (request, response) {
    const { user_id } = request.params;
    const { userId } = request.session;
    if (user_id == userId) {
        response.statusCode = 400;
        response.json({
            message: 'Please go to "/user" to get logged user info',
        });
        return;
    }
    getUserByID({ userId: user_id }).then((user) => {
        if (!user) {
            response.statusCode = 404;
            response.json({
                message: "user not found",
            });
            return;
        }
        response.json(serializeUser(user)[0]);
    });
});

app.put("/user", function (request, response) {
    const { userId } = request.session;
    const { bioText } = request.body;
    if (bioText) {
        updateUserBio({ userId, bioText })
            .then((updatedUser) => response.json({ updatedUser }))
            .catch((error) =>
                console.log(
                    `[Server.js] errorr in PUT route to "/user: "`,
                    error
                )
            );
    }
});

function sendCode({ email, code }) {
    console.log(
        "[Server.js] Sending email with code, first email then code",
        email,
        code
    );
    ses.sendEmail({
        Source: "Super Hero Network <diedemiguel87@hotmail.com>",
        Destination: {
            ToAddresses: [`${email}`],
        },
        Message: {
            Body: {
                Text: {
                    Data: `Use the following code to reset your password: ${code}`,
                },
            },
            Subject: {
                Data: "Password update!",
            },
        },
    })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
}

app.post("/password/reset/start", (request, response) => {
    const { email } = request.body;
    getUserByEmail(email).then((user) => {
        if (!user) {
            response.json({
                message: "Success!",
            });
            return;
        }
        const code = cryptoRandomString({ length: 6 });
        createPasswordResetCode({ email, code }).then(() => {
            console.log("dentro de createPasswordResetCode", code);
            sendCode({ email, code });
            response.json({
                message: "success",
            });
        });
    });
});

app.post("/password/reset/verify", (request, response) => {
    const { email, code, password } = request.body;
    getPasswordResetCodeByEmailAndCode({ email, code }).then((storedCode) => {
        if (!storedCode) {
            respons.statusCode = 400;
            response.json({
                message: "The code is incorrect",
            });
            return;
        }
        updateUserPassword({ email, password }).then(() => {
            response.statusCode = 200;
            response.json({
                message: "Success!",
            });
            return;
        });
    });
});

app.get("/user", (request, response) => {
    const { userId } = request.session;
    getUserByID({ userId }).then((user) => {
        response.json(serializeUser(user)[0]);
    });
});

app.post(
    "/upload-picture",
    uploader.single("file"),
    s3upload,
    (request, response) => {
        const { userId } = request.session;
        const profilePicURL = getURLFromFilename(request.file.filename, Bucket);
        updateUserProfile({ userId, profilePicURL })
            .then(() => {
                response.json({ profilePicURL });
            })
            .catch((error) => {
                response.statusCode(500);
                console.log("Error while uploading file: ", error);
            });
    }
);

app.get("/users/most-recent", (request, response) => {
    getMoreRecentUsers().then((results) => {
        var filteredResults = results.filter(
            (x) => x.id !== request.session.userId
        );
        response.json(serializeUser(filteredResults));
    });
});

app.get("/users/search", (request, response) => {
    const { q } = request.query;
    if (!q) {
        response.statusCode = 400;
        response.json({
            message: "the request should include a 'q' parameter in the query",
        });
        return;
    }
    searchUsers(q).then((users_list) => {
        var filteredResults = users_list.filter(
            (x) => x.id !== request.session.userId
        );
        response.json(serializeUser(filteredResults));
    });
});

app.get("/friendships/:user_id", (request, response) => {
    const first_id = request.params.user_id;
    const second_id = request.session.userId;
    getFriendship({ first_id, second_id }).then((friendship) => {
        if (!friendship) {
            response.statusCode = 404;
            response.json({
                message: `No friendship between ${first_id} and ${second_id}`,
            });
            return;
        }
        response.json(friendship);
    });
});

app.put("/friendships/:sender_id", (request, response) => {
    const sender_id = request.params.sender_id;
    const recipient_id = request.session.userId;
    const accepted = request.body.accepted;
    updateFriendship({ sender_id, recipient_id, accepted }).then(
        (updatedFriendship) => {
            if (!updatedFriendship) {
                response.statusCode = 404;
                response.json({
                    message: `No friendship between ${sender_id} and ${recipient_id}`,
                });
                return;
            }
            response.json(updatedFriendship);
        }
    );
});

app.delete("/friendships/:recipient_id", (request, response) => {
    const first_id = request.params.recipient_id;
    const second_id = request.session.userId;
    deleteFriendship({ first_id, second_id }).then(() =>
        response.json({
            message: `Friendship between ${first_id} and ${second_id} was deleted`,
        })
    );
});

app.post("/friendships", (request, response) => {
    const recipient_id = request.body.recipient_id;
    const sender_id = request.session.userId;
    getFriendship({ first_id: recipient_id, second_id: sender_id }).then(
        (friendship) => {
            if (friendship) {
                response.statusCode = 404;
                response.json({
                    message: `Friendship between ${first_id} and ${second_id} already exists`,
                });
                return;
            }
            createFriendship({ sender_id, recipient_id })
                .then((friendship) => {
                    response.json(friendship);
                })
                .catch((error) => {
                    console.log(
                        `[Server.js POST/friendships] Error creating friendship ${recipient_id} and ${sender_id}: `,
                        error
                    );
                    response.statusCode = 500;
                    response.json({
                        message: `[Server.js POST/friendships error 500] Error creating friendship ${recipient_id} and ${sender_id}`,
                    });
                });
        }
    );
});

app.get("/friends", (request, response) => {
    getFriendships(request.session.userId)
        .then((results) => {
            console.log("server logged in user", request.session.userId);
            if (results.length < 1) {
                response.statusCode = 400;
                response.json({
                    message: "No freindships for the logged in user",
                });
            }
            response.json(results);
        })
        .catch((error) => {
            console.log(
                '[Server.js] error in GET route to "/friendships"',
                error
            );
        });
});

app.post("/logout", function (request, response) {
    request.session.userId = null;
    response.json({ message: "logged out" });
});

app.get("/welcome", function (request, response) {
    if (request.session.userId) {
        response.redirect("/");
        return;
    }
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.get("*", function (request, response) {
    if (!request.session.userId) {
        response.redirect("/welcome");
        return;
    }
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

//Listener
app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
