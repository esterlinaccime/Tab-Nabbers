/**
 * Created by esterlingaccime on 5/10/17.
 */
var express = require("express"),
    passport = require("passport"),
    path = require("path");

var router = express.Router();

// Verified that the user needs to sign in
var isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
};


// Home page
router.get("/index", function (req, res) {
    res.render("index");
});


// Sign in for Recruiters and Students
router.get("/signin/:name?", function (req, res) {
    if(req.params.name === 'recruiter'){
        res.render("recruiter_login");

    }
    else if(req.params.name === "student"){
        res.render("student_login");

    }

});



// Sigin up Routers for Recruiters and Students
router.get("/signup/:name?", function (req, res) {
    if(req.params.name === 'recruiter'){
        res.render("recruiter_signup");

    }

    else if(req.params.name === "student"){
        res.render("student_signup");

    }

});


// Dashboard included the map that recruiters see
// If user not logged in, they're not able to see it
router.get("/dashboard", isLoggedIn, function (req, res) {
    res.render("dashboard");
});


// Profile page for Students
// If user not logged in, they're not able to see it
router.get("/profile", isLoggedIn, function (req, res) {
    var currentUser = req.user;
    // console.log(req.user);
    res.render("student_profile", currentUser);
});


// Log the user out
// If user not logged in, they're not able to see it
router.get("/logout", isLoggedIn, function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/index");
    });
});


router.get("*", function (req, res) {
    res.render("index");
});



////////////////////////////////////////////////////////////////////
///////////////////Post Request Go below////////////////////////////
////////////////////////////////////////////////////////////////////

// Sign Up for Recruiters
router.post('/signup/recruiter', passport.authenticate("recruiter-signup", {
    successRedirect: '/dashboard',
    failureRedirect: '/signup/recruiter'

}));


// Signin for Recruiters
router.post('/signin/recruiter', passport.authenticate("recruiter-signin", {
    successRedirect: '/dashboard',
    failureRedirect: '/signin/recruiter'

}));


// Sign Up for Students
router.post('/signup/student', passport.authenticate("student-signup", {
    successRedirect: '/profile',
    failureRedirect: '/signup/student'

}));


// Signin for Students
router.post('/signin/student', passport.authenticate("student-signin", {
    successRedirect: '/profile',
    failureRedirect: '/signin/student'

}));



module.exports = router;
