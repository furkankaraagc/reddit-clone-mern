const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log(req.headers.authorization);
    return res.status(501).json("Unauthorizied");
  }
  try {
    const decoded = jwt.verify(token, "123");
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({ error: "errors" });
  }
};
