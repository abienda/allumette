var express = require("express");
var router = express.Router();
var db = require("../db");
var bcrypt = require("bcrypt");

/**
 * Accéder à la page de connexion.
 */
router.get("/", function(req, res, next) {
  res.render("login", {
    user: req.session && req.session.user,
    title: "Connexion"
  });
});

/**
 * Authentification avec cryptage du mot de passe.
 */
router.post("/", function(req, res, next) {
  var { email, password } = req.body;
  var usersCollection = db.get("awale").collection("users");
  usersCollection
    .findOne({ email: email })
    .then(function(user) {
      if (!user) {
        var error = new Error();
        error.message = "L'email fourni est erroné";
        error.statusCode = 403;
        throw error;
      }

      return bcrypt.compare(password, user.password).then(function(isMatch) {
        if (!isMatch) {
          var error = new Error();
          error.message = "Le mot de passe est incorrect";
          error.statusCode = 403;
          throw error;
        }

        req.session.user = user;
        res.redirect("/");
      });
    })
    .catch(function(error) {
      res.render("login", { error: error });
    });
});

module.exports = router;
