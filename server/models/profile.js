//this model is used to store the profile information of the user
const monogoose = require("mongoose");

const profileSchema = new monogoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    user: {
      type: monogoose.Schema.Types.ObjectId,
      ref: "User",
    },
    list: [
      {
        type: monogoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true }
);

module.exports = monogoose.model("Profile", profileSchema);
