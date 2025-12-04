const UserModel = require("../models/User.model");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");

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
        res.status(200).json({ message: "you logged in !" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  //32:09 du 08/04/2025
});

module.exports = router;
