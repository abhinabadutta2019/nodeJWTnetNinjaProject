const { Router } = require("express");
const router = Router();
const User = require("../models/User");

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

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
/////////////
router.get("/signup", (req, res) => {
  res.render("signup");
});
//
router.get("/login", (req, res) => {
  res.render("login.ejs");
});
//
router.post("/signup", async (req, res) => {
  try {
    // const { email, password } = req.body;
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
});
//
router.post("/login", (req, res) => {
  try {
    console.log(req.body.email, req.body.password);
  } catch (err) {}

  res.send("user login1");
});

//
module.exports = router;
