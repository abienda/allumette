var express = require("express");
var router = express.Router();

/**
 * Accéder à la page d'inscription.
 */
router.get("/", function(req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
