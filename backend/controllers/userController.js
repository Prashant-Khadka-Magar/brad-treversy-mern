const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { json } = require("express");

//-----------REGISTERING USER-------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check for all the fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("PLease add all fiels");
  }

  //check if email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("USER ALREADY EXIST");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("INVALID USER DATA");
  }
});

//-----------LOGIN USER-------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for all the fields
  if (!email || !password) {
    res.status(400);
    throw new Error("PLease add all fiels");
  }

  //check for user email in database
  const user = await User.findOne({ email });

  //password==user entered password user.password==password form databse
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("INVALID CREDENTIALS");
  }
});

//-----------GET USER DETAILS || PRIVATE ROUTE-------
const getMe = asyncHandler(async (req, res) => {
  const { id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id,
    name,
    email,
  });
});

//genetrate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };
