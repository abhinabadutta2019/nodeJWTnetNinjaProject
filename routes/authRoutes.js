const { Router } = require("express");
const router = Router();

//
router.get("/signup", (req, res) => {
  res.render("signup");
});
//
router.get("/login", (req, res) => {
  res.render("login.ejs");
});
//
router.post("/signup", (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  res.send("new signup1");
});
//
router.post("/login", (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);

  res.send("user login1");
});
//
module.exports = router;
