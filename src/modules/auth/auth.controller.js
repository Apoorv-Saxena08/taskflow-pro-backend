const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRepo = require("../user/user.repository");
const { JWT_SECRET } = require("../../config/env");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
