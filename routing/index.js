var express = require("express");
var router = express.Router();

/**
 * Page d'accueil
 */
router.get("/", function(req, res, next) {
  res.render("index", {
    user: req.session && req.session.user
  });
});

// Autres routes
router.use("/comments", require("./comments"));
router.use("/login", require("./login"));
router.use("/signup", require("./signup"));
router.use("/logout", require("./logout"));
router.use("/play", require("./play"));


module.exports = router;
