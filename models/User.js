const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
    //here (val) is the value inputed
    // validate: [isEmail, "Please enter valid email"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Minimum password length 6 charecters"],
  },
});

//fire a function after document saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user was created and saved", doc);
  next();
});

//fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  // console.log("user about to be created and saved", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    //
    if (auth) {
      return user;
    }
    //else block
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

//
module.exports = User;
