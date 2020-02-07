const code = require("../../../code/resultCode");
const User = require("../../../models/user");

exports.authenticate = async (req, res) => {
  try {
    let user = await User.findUser(req.body.id);
    if (user === null) {
      res.redirect(307, "register");
    }

    user = await User.refreshToken(req.body.id, req.body.token);

    res.send(ok({ id: user.id, token: user.token }));
  } catch (err) {
    res.sendStatus(code.UNAVAILABLE);
  }
};

exports.register = async (req, res) => {
  try {
    const { id, token } = req.body;
    const user = await User.register(id, token);

    res.send(ok({ id: user.id, token: user.token }));
  } catch (err) {
    return serverError("Can't get results" + err);
  }
};

exports.mypage = async (req, res) => {
  const id = req.params.id;
  try {
    const { movies, shows, nickname } = await User.getUserData(id);
    res.send(ok({ movies, shows, nickname }));
  } catch (err) {
    return serverError("Can't get results" + err);
  }
};

exports.addLikeMovie = async (req, res) => {};

exports.addLikeShow = async (req, res) => {};

const ok = body => {
  return {
    status: code.OK,
    data: JSON.stringify(body)
  };
};

const serverError = message => {
  return {
    status: code.UNAVAILABLE,
    text: Promise.resolve(JSON.stringify({ message }))
  };
};
