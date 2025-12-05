const UserModel = require("../models/User.model");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middlewares");

//to create a user
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //generate the salt for the password
    const mySalt = bcryptjs.genSaltSync(12);
    //console.log({ mySalt });
    const hashedPassword = bcryptjs.hashSync(password, mySalt);
    const hashedUser = {
      ...req.body,
      password: hashedPassword,
    };
    const newUser = await UserModel.create(hashedUser);
    console.log("user created successfully", newUser);
    res.status(201).json({ message: "user successfully created in DB" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//to login the user
router.post("/login", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Invalid credentials" });
    } else {
      // if user found we compare the password
      const passwordFromFrontend = req.body.password;
      const passwordHashedInDB = foundUser.password;
      const passwordsMatch = bcryptjs.compareSync(
        passwordFromFrontend,
        passwordHashedInDB
      );
      //console.log("passwords match ?", passwordsMatch);
      if (!passwordsMatch) {
        res.status(400).json({ errorMessage: "Invalid credentials" });
      } else {
        // the email exists and the passwords match
        const data = { _id: foundUser._id, username: foundUser.username };
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "15d",
        });
        res.status(200).json({ message: "you logged in !", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// to verify if the token is present and valid
router.get("/verify", isAuthenticated, async (req, res) => {
  console.log("here in the verify route");
  res.status(200).json({ message: "Token valid", payload: req.payload });
});
module.exports = router;
