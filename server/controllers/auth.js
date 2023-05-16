const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./config/.env" });

const SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ id: user._id, userName: user.userName }, SECRET, {
    expiresIn: 3600000,
  });
};


const postLogin = async (req, res, done) => {
  const { userName, password } = req.body;

  // validate form
  const validationErrors = [];
  if (validator.isEmpty(userName))
    return res.status(400).json({ message: "Username cannot be blank." });
  if (validator.isEmpty(req.body.password))
    return res.status(400).json({ message: "Password cannot be blank." });
  if (validationErrors.length)
    return res.status(400).jason({ message: validationErrors });

  try {
    // check if the user is in the database
    const existingUser = await User.findOne({ $or: [{ userName }] });
    
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });

    // if user exists, check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (isPasswordCorrect) {
      // if user exists, and password is correct, generate token with username
      const token = generateToken(existingUser);

      // after token is signed, we want to return the request with a success
      return res.status(200).json({ message: userName, token });
    } else {
      return res.status(400).json({ message: "Password was incorrect." });
    }
  } catch (error) {
    console.log(error);
  }
};

const postSignup = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    
    const validationErrors = [];

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    if (!validator.isLength(password, { min: 8 }))
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters long." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    if (validationErrors.length)
      return res.status(400).json({
        message: "Sign up failed validation ):",
        errors: validationErrors,
      });

    const user = new User({
      userName,
      email,
      password,
    });

    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "User already exists!",
        body: existingUser,
      });
    }

    await user.save();

    const token = generateToken(user);

    return res.status(201).json({
      status: 201,
      message: "User created :)",
      body: user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};


const getUser = (req, res) => {
  return res.status(200).json({ message: req.user });
};

module.exports = {
  postLogin,
  postSignup,
  getUser,
};


