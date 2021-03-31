//Dependencies
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const { compare } = require("bcryptjs");
const cookieSession = require("cookie-session");
const {
    createUser,
    getUserByEmail,
    createPasswordResetCode,
    getPasswordResetCodeByEmailAndCode,
    updateUserPassword,
} = require("./db");
const cryptoRandomString = require("crypto-random-string");

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

//Routing
app.post("/login", (request, response) => {
    const { email, password } = request.body;
    let error;
    if (!email || !password) {
        error = "You forgot something";
        response.render("login", {
            error,
            home: false,
            firstHeader: "Cast a vote!",
            title: "Login!",
            actionPage: "login",
        });
        return;
    }
    getUserByEmail(email).then((user) => {
        if (!user) {
            response.statusCode = 400;
            console.log("login error, no user with this email", error);
            response.json({
                message: "login error",
            });
            return;
        }
        compare(password, user.password_hash).then((match) => {
            if (!match) {
                response.statusCode = 400;
                console.log("login error, wrong password", error);
                response.json({
                    message: "login error",
                });
                return;
            }
            request.session.userId = user.id;
            response.json({
                message: "succes",
                user_id: user.id,
            });
        });
    });
});

app.post("/users", (request, response) => {
    createUser({ ...request.body })
        .then((createdUser) => {
            request.session.userId = createdUser.id;
            response.json({
                message: "succes",
                user_id: createdUser.id,
            });
        })
        .catch((error) => {
            response.statusCode = 400;
            console.log("[social:express] createUser error", error);
            response.json({
                message: "Wrong fields sent",
            });
        });
});

app.get("/welcome", function (request, response) {
    if (request.session.userId) {
        response.redirect("/");
        return;
    }
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
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
