var express = require("express");
var router = express.Router();
var db = require("../db");

/**
 * Accéder à la page de jeux.
 */
router.get("/", function(req, res, next) {
    res.render("play", {
      user: req.session && req.session.user,
      title: "Jouer"
    });
  });

  


module.exports = router;