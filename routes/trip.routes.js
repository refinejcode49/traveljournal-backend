const { response } = require("../app");
const TripModel = require("../models/Trip.model");

const router = require("express").Router();

//to create a trip
router.post("/create", async (req, res) => {
  TripModel.create(req.body)
    .then((responseFromDB) => {
      console.log("voyage crée, responseFromDB");
      res.status(201).json(responseFromDB);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problèmes dans la création d'un voyage" });
    });
});

//to get all the trips
//01:27:38 du 08/04/2025
module.exports = router;
