// Used to secure passwords
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
    var Recruiter = user;
    var LocalStrategy = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
        Recruiter.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

<<<<<<< HEAD
    passport.use('local-signup', new LocalStrategy({
=======


////////////////////////////////////////////////////////////////////
///////////////////Recruiter Access Below///////////////////////////
////////////////////////////////////////////////////////////////////
    // Sign Up Recruiter
    passport.use('recruiter-signup', new LocalStrategy(
        {
>>>>>>> a86ea5f6b02fc52ed893593f244021eb0a7ab1f6
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

<<<<<<< HEAD
        function(req, email, password, done) {
=======
        function (req, email, password, done) {
            // Creating long string password for users
>>>>>>> a86ea5f6b02fc52ed893593f244021eb0a7ab1f6
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            Recruiter.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });

                } else {
                    console.log('Creating new user');
                    var userPassword = generateHash(password);

<<<<<<< HEAD
                    var student = {
=======
                    var recruiter = {
>>>>>>> a86ea5f6b02fc52ed893593f244021eb0a7ab1f6
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };

                    console.log(recruiter);


                    Recruiter.create(recruiter).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    //LOCAL SIGNIN
<<<<<<< HEAD
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
            var User = user;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
=======
    passport.use('recruiter-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
            // Generating long string password
            var isValidPassword = function(userpass,password){
                return bCrypt.compareSync(password, userpass);
            };

            Recruiter.findOne({
                where : {
                    email: email
                }
            }).then(function (user) {
>>>>>>> a86ea5f6b02fc52ed893593f244021eb0a7ab1f6

                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }

<<<<<<< HEAD
                if (!isValidPassword(user.password, password)) {

                    return done(null, false, { message: 'Incorrect password.' });

                }

                var userinfo = user.get();

                return done(null, userinfo);

            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));

}
=======
                if (!isValidPassword(user.password,password)) {

                    return done(null, false, { message: 'Incorrect password.' });

                }

                var userinfo = user.get();

                return done(null,userinfo);

            }).catch(function(err){

                console.log("Error:",err);

                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    )); // Sigin Recruiter



};

>>>>>>> a86ea5f6b02fc52ed893593f244021eb0a7ab1f6
