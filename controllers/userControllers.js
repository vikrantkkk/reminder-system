const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
exports.registerUser = async (req, res) => {
  try {
    const { name, userName, password } = req.body;
    console.log(name, userName, password);
    
    if (!(name && userName && password)) {
      return res.status(400).json({ error: "missing required fields" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "invalid password format" });
    }

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ error: "username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      userName,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!(userName && password)) {
      return res.status(400).json({ error: "missing required fields" });
    }
    const user = await User.findOne({ userName });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    });

    res.status(200).json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};
