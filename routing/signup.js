var express = require("express");
var router = express.Router();
var db = require("../db");
var bcrypt = require("bcrypt");
var saltRounds = 10;
var signupValidation = require("../middleware/signup-validation");

/**
 * Accéder à la page d'inscription.
 */
router.get("/", function(req, res, next) {
  res.render("signup", {
    user: req.session && req.session.user,
    title: "Inscription"
  });
});



/**
 * Inscription avec cryptage du mot de passe.
 */
// On passe une "fonction de middleware" juste avant le middleware correspondant à la route.
// Cette fonction appelée signupValidation reçoit en argument (req, res, next) et a pour rôle
// de valider les données reçues depuis la page d'inscription.
//
// Cette vérification est essentielle car rien ne nous assure que l'utilisateur a effectivement
// soumis notre forumaire d'inscription en respectant le mécanisme fourni côté client.
// Il pourrait très bien avoir désactivé JavaScript sur son navigateur ou bien avoir inséré
// du code JS malicieux pour contourner notre mécanisme de validation côté client.
//
// NE JAMAIS FAIRE CONFIANCE AUX DONNEES ENVOYEES PAR L'UTILISATEUR !
router.post("/", signupValidation, function(req, res, next) {
  var { username, avatar, email, password: plainPassword } = req.body;
  var usersCollection = db.get("awale").collection("users");

  usersCollection
    .findOne({ username: username })
    .then(function(user) {
      // l'utilisateur existe déjà
      if (user) {
        var error = new Error();
        error.message = "Cet utilisateur existe déjà";
        error.statusCode = 403;
        throw error;
      }

      bcrypt
        .hash(plainPassword, saltRounds)
        .then(function(hash) {
          return usersCollection.insertOne({
            username: username,
            avatar: avatar,
            email: email,
            password: hash
          });
        })
        .then(function(response) {
          req.session.user = response.ops[0]; // contient le 'user'
          res.status(200);
          res.redirect("/");
        });
    })
    .catch(function(error) {
      res.render("signup", { error: error });
    });
});

module.exports = router;
