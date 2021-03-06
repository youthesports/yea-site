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
        res.render("index",{
			auth_message: req.flash("auth_message"),
			redirect: null
		});
    });
	app.get("/about", (req, res) => {
        res.render("about",{
			auth_message: req.flash("auth_message"),
			redirect: null
		});
    });
	app.get("/resources", (req, res) => {
        res.render("resources",{
			auth_message: req.flash("auth_message"),
			redirect: null
		});
    });
	app.get("/games", (req, res) => {
        res.render("games",{
			auth_message: req.flash("auth_message"),
			redirect: null
		});
    });
	app.get("/news", (req, res) => {
        res.render("news",{
			auth_message: req.flash("auth_message"),
			redirect: null
		});
    });
}