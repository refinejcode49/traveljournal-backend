const { response } = require("../app");
const StopModel = require("../models/Stop.model");

const router = require("express").Router();

//to create a stop
router.post("/create", async (req, res) => {
  StopModel.create(req.body)
    .then((responseFromDB) => {
      console.log("étape crée, responseFromDB");
      res.status(201).json(responseFromDB);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problèmes dans la création d'une étape" });
    });
});

//to get all the stops from a trips !!! modifier l'ordre car à mettre dans la route parametrées
router.get("/all-stops", async (req, res) => {
  StopModel.find()
    .then((responseFromDB) => {
      console.log("all the stops", responseFromDB);
      res.status(200).json(responseFromDB);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problème pour récupérer toutes les étapes" });
    });
});

// to get one stop
router.get("/:stopId", async (req, res) => {
  StopModel.findById(req.params.stopId)
    .then((oneStop) => {
      console.log("here is one stop", oneStop);
      res.status(200).json(oneStop);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problème pour récupérer une étape" });
    });
});

//to update a stop
router.patch("/update-stop/:stopId", async (req, res) => {
  StopModel.findByIdAndUpdate(req.params.tripId, req.body, { new: true })
    .then((updatedStop) => {
      console.log("stop updated", updatedStop);
      res.status(200).json(updatedStop);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problème dans la mise à jour d'une étape" });
    });
});

// to delete a stop
router.delete("/delete-stop/:stopId", async (req, res) => {
  StopModel.findOneAndDelete(req.params.stopId)
    .then((deletedStop) => {
      console.log("stop deleted", deletedStop);
      res.status(204).json(deletedStop);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Problèmes pour effacer une étape" });
    });
});
//02:00 du 08/04
module.exports = router;
