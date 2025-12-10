const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
    {
  title: {
    type: String,
    required: [true, "Le nom du voyage est obligatoire"],
    unique: true,
    minLength: [3, "Le titre soit avoir au moins 3 lettres"],
    maxLength: [100, "Le titre ne peut pas avoir plus de 100 lettres"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "La date du retour doit être après la date du début du voyage",
    },
  },
  countries: {
    type: [String],
  },
  coverImageuRL: {
    type: String,
    trim: true,
  },
  stopsCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  isPublic: {
    type: Boolean,
    default: false,
    index: true,
  },
  distance: {
    type: Number,
    default: 0,
  },
  budget: {
    type: Number,
    default: null,
  },
  theme: {
    type: String,
    enum: ["aventure", "relaxation", "culturel", "luxe", "éco", "autre"],
  },
  //link the user to the trip
  owner: {
    type: Schema.Types.ObjectId, // the type of the _id in the DB
    ref: "User",
    required: true,
  },
},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
    });

// create the model
const TripModel = model("trip", tripSchema);
module.exports = TripModel;
