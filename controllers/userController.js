const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createAccessToken = (_id, userName) => {
  return jwt.sign({ _id, userName }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    const user = await User.findOne({
      email: email,
      // password: password,
    }).select("-__v");
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    if (user) {
      // Remove the password from the user object before sending the response
      const userWithoutPassword = user.toObject(); // Convert Mongoose document to plain object
      delete userWithoutPassword.password;
      const accToken = createAccessToken(user?._id, email);
      res
        .status(200)
        .json({ accToken, msg: "Login successful", user: userWithoutPassword });
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const register = async (req, res) => {
  const { email, password, name, is_admin } = req.body;
  try {
    if (!email || email.trim().lenght < 1) {
      return res.status(400).json({ error: "email is required" });
    } else if (!password || password.trim().lenght < 1) {
      return res.status(400).json({ error: "password is required" });
    } else if (!name || name.trim().lenght < 1) {
      return res.status(400).send({ error: "name is required" });
    }
    const usedEmail = await User.findOne({ email: email });
    if (usedEmail) {
      res.status(400).json({ error: "Email is already registed" });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        is_admin,
      });
      const accToken = createAccessToken(user?._id, email);
      res
        .status(201)
        .json({ accToken, msg: "Account created successfuly", data: user });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const userInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, is_admin } = req.body;
    const user = await User.findOneAndUpdate(
      req.user._id,
      { name, is_admin },
      { new: true }
    ).select("-password -__v");
    res.status(200).json({ msg: "data updated successfully", user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  login,
  register,
  userInfo,
  updateUser,
};
