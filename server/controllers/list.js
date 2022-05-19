const Profile = require("../models/profile");
const List = require("../models/list");
const User = require("../models/user");

exports.listHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await Profile.findById(req.params.id).populate("list");
    const movie = await List.findOne({ movieId: req.body.movieId });

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
        message: "You cannot add this movie to your list!",
        status: "error",
      });
    }
    if (movie) {
      const movieIndex = profile.list.findIndex(
        (movie) => movie.movieId === req.body.movieId
      );
      profile.list.splice(movieIndex, 1);
      await movie.remove();
      await profile.save();
      return res.status(200).json({
        message: "Movie removed from list",
        status: "success",
        list: profile.list,
      });
    }
    const newList = new List({
      movieName: req.body.movieName,
      moviePoster: req.body.moviePoster,
      movieId: req.body.movieId,
      user: req.user._id,
    });
    await newList.save();
    profile.list.push(newList);
    await profile.save();
    return res.status(200).json({
      message: "Movie added to your list successfully!",
      status: "success",
      list: profile.list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Adding to list failed!",
      status: "error",
    });
  }
};

exports.allListItems = async (req, res) => {
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
        message: "You cannot view this list!",
        status: "error",
      });
    }
    return res.status(200).json({
      message: "List fetched successfully!",
      status: "success",
      list: profile.list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching list failed!",
      status: "error",
    });
  }
};
