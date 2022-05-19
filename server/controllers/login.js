//this controller is used to login, logout and register users
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        error: "User already exists",
        status: "error",
      });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Creating a user failed!",
      status: "error",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "profile"
    );
    if (!user) {
      return res.status(400).json({
        message:
          "User with that email does not exist!. Please create an account",
        status: "error",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        status: "error",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email, profile } = user;

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      httpOnly: true,
    });
    res.status(200).json({
      message: "User logged in successfully!",
      status: "success",
      token, //now we have to send user without password
      user: {
        _id,
        name,
        email,
        profile,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed!",
      status: "error",
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed!",
      status: "error",
    });
  }
};
