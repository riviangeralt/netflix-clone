const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }, // user can have upto 5 profiles and each profile has a name and avatar, we will create a separate schema for each profile
    profile: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ], //billing will be a date to a month from now
    billing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billing",
    },
    address: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "standard", "premium"],
      default: "free",
    },
  },
  { timestamps: true }
);

//we will only hash password if the user changes it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("User", userSchema);
