const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const session = require("express-session");
const db = require("./db");
const auth = module.exports;

function checkPassword(account, password) {
    return bcrypt.compareSync(password, account.password);
}

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function rememberCookie(req) {
    if(req.body.rememberme) {
        req.session.cookie.expires = 1e12;
    } else {
        req.session.cookie.expires = false;
    }
}

auth.addRoutes = function(app) {
    app.use(session({
        secret: process.env.NODE_SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });
    app.get("/signin", (req, res) => {
        if(req.isAuthenticated()) {
            res.redirect("/");
        } else {
            res.render("index", {
                auth_message: req.flash("auth_message"),
				redirect: "signin"
            });
        }
    });

    app.get("/register", (req, res) => {
        if(req.isAuthenticated()) {
            res.redirect("/");
        } else {
            res.render("index", {
                auth_message: req.flash("auth_message"),
				redirect: "register"
            });
        }
    });
    app.post("/auth/signin", passport.authenticate("signin", {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: true
    }));

    app.post("/auth/register", passport.authenticate("register", {
        successRedirect: "/",
        failureRedirect: "/register",
        failureFlash: true
    }));

    app.get("/auth/signout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};

passport.serializeUser((account, done) => {
    done(null, account.username);
});

passport.deserializeUser((username, done) => {
    db.getAccount(username, (err, account) => {
        done(null, account);
    });
});

passport.use("signin", new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        db.getAccount(username, (err, account) => {
            if(err) {
                console.log(err);
                return done(null, false, req.flash("auth_message", "An unknown error occurred. Please try again later."));
            }

            if(!account || !checkPassword(account, password)) {
                return done(null, false, req.flash("auth_message", "Invalid username or password."));
            }

            rememberCookie(req);
            return done(null, account);
        });
    })
);

passport.use("register", new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        db.getAccount(username, (err, account) => {
            if(account) {
                return done(null, false, req.flash("auth_message", "An account with that username already exists."));
            }

            db.newAccount({
                username: username,
                password: createHash(password),
                email: req.body.email
            }, (err, account) => {
                if(err) {
                    console.log(err);
                    return done(null, false, req.flash("auth_message", "An unknown error occurred. Please try again later."));
                }

                rememberCookie(req);
                return done(null, account);
            });
        });
    })
);