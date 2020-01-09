//load bcrypt
const bCrypt = require("bcrypt-nodejs");
const db = require("../models");

module.exports = function(passport, user) {
  const User = user,
    LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        let generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        db.User.findOne({
          where: {
            username: username
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That username is already taken"
            });
          } else {
            let userPassword = generateHash(password);

            let data = {
              username: username,
              password: userPassword
            };

            db.User.create(data).then(function(newUser, created) {
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
    )
  );
  //LOCAL LOGIN
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email

        usernameField: "username",

        passwordField: "password",

        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, username, password, done) {
        let User = user;

        let isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        db.User.findOne({
          where: {
            username: username
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "User does not exist"
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // deserialize user
  passport.deserializeUser(function(id, done) {
    db.User.findOne({
      where: {
        id: id
      }
    }).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
