const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  //grabing the token from browser cookie
  const token = req.cookies.jwt; //cookie is saved as named "jwt" in browser

  //check if json web token exists & verify
  if (token) {
    jwt.verify(token, "jwt secret key", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    }); //"token" coming form authRoutes.js
  } else {
    res.redirect("/login");
  }
};

//
module.exports = { requireAuth };
