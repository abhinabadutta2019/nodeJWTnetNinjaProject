const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  //grabing the token from browser cookie
  const token = req.cookies.jwt; //cookie is saved as named "jwt" in browser

  //check if json web token exists & verify
  if (token) {
    jwt.verify(token, "jwt secret key", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } //"token" coming form authRoutes.js
  else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  //grabing the token from browser cookie
  const token = req.cookies.jwt; //cookie is saved as named "jwt" in browser

  if (token) {
    jwt.verify(token, "jwt secret key", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//
module.exports = { requireAuth, checkUser };
