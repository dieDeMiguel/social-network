//Dependencies
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const { createUser } = require("./db");

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
    response.statusCode = 200;
    response.json({
        message: "Logged In",
    });
    return;
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
