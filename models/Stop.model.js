const { Schema, model } = require("mongoose");

const stopSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "le titre doit avoir au moins 2 lettres"],
      maxlength: [150, "Le titre ne peut pas excéder 150 lettres"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [5000, "La description ne peut pas excéder 5000 lettres"],
    },
    date: {
      type: Date,
      //required: true,
    },
    locationName: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    //pour les coordonnées GPS
    photos: {
      type: [String], // url des photos stockés sur cloudinary
      default: [],
      validate: {
        validator: function (arr) {
          if (arr.length > 5) return false;
        },
        message: "Un maximum de 4 photos est autorisé.",
      },
    },
    rating: {
      type: String,
      enum: [1, 2, 3, 4, 5],
      message: "La note doit etre entre 1 et 5",
    },
    mood: {
      type: String,
      enum: [
        "excité(e)",
        "relaxé(e)",
        "nostalgique",
        "inspiré(e)",
        "fatigué(e)",
        "neutre",
      ],
      message:
        "L'humeur doit etre une de ces valeurs : excité(e), relaxé(e), nostalgique, inspiré(e), fatigué(e), neutre.",
      default: null,
    },
    activités: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: "Un maximun de 10 activités est autorisée",
      },
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    owner: {
        type: Schema.Types.ObjectId, // the type of the _id in the DB
        ref: "User",
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const StopModel = model("stop", stopSchema);
module.exports = StopModel;
