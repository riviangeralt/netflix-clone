const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
