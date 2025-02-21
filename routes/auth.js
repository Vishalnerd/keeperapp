const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });
    await user
      .save()
      .then(() => res.status(200).json({ message: "Sign Up Successful" }));
  } catch (error) {
    res.status(200).json({ message: "User already exists" });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).json({ message: "Please Sign Up First" });
    }
    const ispasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!ispasswordCorrect) {
      res.status(200).json({ message: "Password is incorrect" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(200).json({ message: "User already exists" });
  }
});

// GOOGLE LOGIN
router.post("/googleLogin", async (req, res) => {
  const { email, username, googleId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, username, googleId });
      await user.save();
    }

    res.status(200).json({ message: "Google Login Successful", user });
  } catch (error) {
    console.error("Google Login error:", error);
    res.status(500).json({ message: "Google Login Failed" });
  }
});

module.exports = router;
