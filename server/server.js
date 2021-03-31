//Dependencies
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");

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
app.post("/users-failing", (request, response) => {
    response.statusCode = 400;
    response.json({
        message: "bad request",
    });
});

app.post("/users", (request, response) => {
    request.session.userId = 123;
    response.json({
        message: "success",
    });
    return;

    // your final working code after you setup the db will look like this

    // createUser(request.body).then(createdUser => {
    //     request.session.userId = createdUser.id;
    //     response.json(createdUser);
    // }).catch(error => {
    //     response.statusCode = 400;
    //     console.log('[social:express] createUser error', error);
    //     response.json({
    //         message: 'Wrong fields sent'
    //     });
    // });
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
