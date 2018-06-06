const port = +process.env.PORT || 8080;
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const app = express();
const server = http.createServer(app);
const auth = require("./auth");

module.exports = function(dir) {
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.set("views", dir + "/views");
    app.use(express.static(dir + "/public"));
    app.use(flash());
    app.enable("trust proxy");
    server.listen(port);
    auth.addRoutes(app);

    console.log("Server ready on port " + port + ".");

    //Routes
    app.get("/", (req, res) => {
        res.render("index");
    });
}