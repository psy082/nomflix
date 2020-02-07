const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  token: {
    type: String,
    require: true
  },
  nickname: {
    type: String
  },
  likeMovies: {
    type: [String]
  },
  likeShows: {
    type: [String]
  }
});

UserSchema.statics.verify = async (id, token) => {
  try {
    let result = await User.findOne({ id: id, token: token });
    if (!result) return false;
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

UserSchema.statics.findUser = async id => {
  try {
    let user = await User.findOne({ id: id });

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

UserSchema.statics.register = async (id, token) => {
  const newUser = new User({ id: id, token: token });

  try {
    let user = await newUser.save();
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

UserSchema.statics.refreshToken = async (id, token) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { id: id },
      { token: token }
    );
    return updateUser;
  } catch (err) {
    throw new Error(err);
  }
};

UserSchema.statics.getUserData = async id => {
  try {
    let userData = User.findOne({ id: id }).populate(
      "likeMovies",
      "likeShows",
      "nickname"
    );
    return userData;
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
