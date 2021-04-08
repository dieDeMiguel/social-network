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
} = require("./db");
const cryptoRandomString = require("crypto-random-string");
const { s3upload, getURLFromFilename } = require("../s3");
const { Bucket } = require("../config.json");
const { response } = require("express");

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
            request.session.userId = createdUser;
            response.json({
                createdUser,
            });
        })
        .catch((error) => {
            if (error.constraint === "users_email_key") {
                response.statusCode = 400;
                console.log("[social:express] createUser error", error);
                response.json({
                    message: "Email taken",
                });
                return;
            }
            response.statusCode = 500;
            console.log("[social:express] createUser error", error);
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
        console.log("[serialize en server]", serializeUser(user)[0]);
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
        "[social:email] sending email with code, first email then code",
        email,
        code
    );
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
            sendCode({ email, code });
            response.json({
                message: "success",
            });
        });
    });
});

app.post("/password/reset/verify", (request, response) => {
    const { email, code, password } = request.body;
    console.log("dentro de server.js, password", password);
    getPasswordResetCodeByEmailAndCode({ email, code }).then((storedCode) => {
        console.log("[/password/reset/verify route] storedCode: ", storedCode);
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
    getMoreRecentUsers().then((results) =>
        response.json(serializeUser(results))
    );
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
        response.json(serializeUser(users_list));
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
