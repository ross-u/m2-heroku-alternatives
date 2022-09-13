const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");
const User = require('./../models/User.model');


/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session
  let userIsLoggedIn = false;
  if (req.session.user) {
    userIsLoggedIn = true;
  }

  res.render("index", { userIsLoggedIn: userIsLoggedIn });

});

// GET /secret
// We use the isLoggedIn middleware to protect the route

router.get("/secret", isLoggedIn, (req, res, next) => {
  let userIsLoggedIn = false;

  if (req.session.user) {
    userIsLoggedIn = true;
    User.findById(req.session.user._id)
      .then((foundUser) => {
        console.log('foundUser', foundUser);
        res.render("secret-view", { userIsLoggedIn: userIsLoggedIn, foundUser });
      })
      .catch( (err) => console.log(err));
  }
  else {
    res.render("secret-view", { userIsLoggedIn: userIsLoggedIn });
  }

});

module.exports = router;
