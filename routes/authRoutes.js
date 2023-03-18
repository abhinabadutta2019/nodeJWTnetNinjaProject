const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect email( login route)
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  //incorrect password( login route)
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }
  //duplicate error code
  if (err.code === 11000) {
    errors.email = "this email is already registered";
    return errors;
  }
  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// function--creating jwt token
const createToken = (id) => {
  return jwt.sign({ id }, "jwt secret key"); //jwt.sign
};

/////////////
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
//
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

//post signup
router.post("/signup", async (req, res) => {
  try {
    // const { email, password } = req.body;
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    //jwt
    const token = createToken(user._id); //createToken() function called here--created on line 25--using --jwt.sign() method
    //cookie
    res.cookie("jwt", token); //jwt is the name of the cookie
    res.status(201).json({ user: user._id }); //res.json is similar to res.send--
  } catch (err) {
    const errors = handleErrors(err); // here calling my created error function

    res.status(400).json({ errors }); //here sending the error
  }
});
//
router.post("/login", async (req, res) => {
  try {
    //User.login() method created on -  User model file - line 42
    const user = await User.login(req.body.email, req.body.password);
    //jwt
    const token = createToken(user._id); //createToken() function called here--created on line 25--using --jwt.sign() method
    //cookie
    res.cookie("jwt", token); //jwt is the name of the cookie
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    //sening a blank object if error
    // res.status(400).json({});
  }
});

//logout
router.get("/logout", async (req, res) => {
  //resetting the value of token to '' empty string
  res.cookie("jwt", "", { maxAge: 1 }); //maxAge of the value is 1 mili second
  res.redirect("/");
});

//
module.exports = router;
