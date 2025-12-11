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
router.get("/all-trips", async (req, res) => {
  TripModel.find()
    .then((responseFromDB) => {
      console.log("all the trips", responseFromDB);
      res.status(200).json(responseFromDB);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problème pour récupérer tous les voyages" });
    });
});

// to get one trip
router.get("/:tripId", async (req, res) => {
  TripModel.findById(req.params.tripId)
    .then((oneTrip) => {
      console.log("here is one trip", oneTrip);
      res.status(200).json(oneTrip);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problème pour récupérer un voyage" });
    });
});

//to update a trip
router.patch("/update-trip/:tripId", async (req, res) => {
  TripModel.findByIdAndUpdate(req.params.tripId, req.body, { new: true })
    .then((updatedTrip) => {
      console.log("trip updated", updatedTrip);
      res.status(200).json(updatedTrip);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problème dans la mise à jour du voyage" });
    });
});

// to delete a trip
router.delete("/delete-trip/:tripId", async (req, res) => {
  TripModel.findOneAndDelete(req.params.tripId)
    .then((deletedTrip) => {
      console.log("trip deleted", deletedTrip);
      res.status(204).json(deletedTrip);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problèmes pour effacer un voyage" });
    });
});

module.exports = router;
