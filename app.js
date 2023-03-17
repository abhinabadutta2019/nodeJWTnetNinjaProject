const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
// const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://127.0.0.1:27017/15th-March";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home.ejs"));
app.get("/smoothies", (req, res) => res.render("smoothies.ejs"));

//cookie with res
app.get("/set-cookies", (req, res) => {
  //without cookie-parser npm
  // res.setHeader("set-cookie", "newUser = true");

  //with cookie-parser npm
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.send("you got the cookies");
});

//cookie with req
app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);
});
//routes app.use
app.use(authRoutes);
