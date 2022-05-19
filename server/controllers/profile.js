//this controller is for user to create, update, delete and view their profile
const Profile = require("../models/profile");
const User = require("../models/user");

exports.createProfile = async (req, res) => {
  try {
    //user can have upto 5 profiles with different names and avatars
    const user = await User.findById(req.user._id);
    //we will check if the user has already created a profile with the same name
    const profile = await Profile.findOne({ name: req.body.name });
    if (!user) {
      return res.status(500).json({
        message: "User does not exist!",
        status: "error",
      });
    }
    if (user.profile.length >= 5) {
      return res.status(400).json({
        message: "You can have upto 5 profiles!",
        status: "error",
      });
    }
    if (profile) {
      return res.status(400).json({
        message: "You already have a profile with this name",
        status: "error",
      });
    }
    //if user has less than 5 profiles, we will create a new profile and push it to the user's profile array
    const newProfile = new Profile({
      name: req.body.name,
      user: req.user._id,
    });
    await user.profile.push(newProfile._id);
    await user.save();
    await newProfile.save();
    res.status(201).json({
      message: "Profile created successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Creating a profile failed!",
      status: "error",
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await Profile.findById(req.params.id);
    if (!user) {
      return res.status(500).json({
        message: "User does not exist!",
        status: "error",
      });
    }
    if (!profile) {
      return res.status(500).json({
        message: "Profile does not exist!",
        status: "error",
      });
    }
    if (profile.user.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        message: "You cannot delete this profile!",
        status: "error",
      });
    }
    const index = user.profile.indexOf(profile._id);
    user.profile.splice(index, 1);
    await user.save();
    await profile.remove();
    res.status(200).json({
      message: "Profile deleted successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Deleting a profile failed!",
      status: "error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await Profile.findById(req.params.id);
    if (!user) {
      return res.status(500).json({
        message: "User does not exist!",
        status: "error",
      });
    }
    if (!profile) {
      return res.status(500).json({
        message: "Profile does not exist!",
        status: "error",
      });
    }
    if (profile.user.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        message: "You cannot update this profile!",
        status: "error",
      });
    }
    profile.name = req.body.name;
    await profile.save();
    res.status(200).json({
      message: "Profile updated successfully!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Updating a profile failed!",
      status: "error",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await Profile.findById(req.params.id).populate("list");
    if (!user) {
      return res.status(500).json({
        message: "User does not exist!",
        status: "error",
      });
    }
    if (!profile) {
      return res.status(500).json({
        message: "Profile does not exist!",
        status: "error",
      });
    }
    if (profile.user.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        message: "You cannot view this profile!",
        status: "error",
      });
    }
    res.status(200).json({
      message: "Profile fetched successfully!",
      status: "success",
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching a profile failed!",
      status: "error",
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profiles = await Profile.find({ user: req.user._id }).populate(
      "list"
    );
    if (!user) {
      return res.status(500).json({
        message: "User does not exist!",
        status: "error",
      });
    }
    if (!profiles) {
      return res.status(500).json({
        message: "Profiles do not exist!",
        status: "error",
      });
    }
    res.status(200).json({
      message: "Profiles fetched successfully!",
      status: "success",
      profiles: profiles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching all profiles failed!",
      status: "error",
    });
  }
};
