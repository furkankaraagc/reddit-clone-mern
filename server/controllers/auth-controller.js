const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");

const app = express();

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await new UserModel({
      username,
      password,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = jwt.sign({ id: user._id }, "123");

    res.status(201).json({ success: true, token: token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json("User already exists");
    }
    res.status(500).json("Something went wrong");
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong password " });
    }
    const token = jwt.sign({ id: user._id }, "123");

    res.status(200).json({
      success: true,
      isMatch,
      token: token,
      username: username,
      userId: user._id,
    });
  } catch {
    res.status(404).json({ success: false, error: "Wrong username" });
  }
};
