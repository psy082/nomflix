const code = require("../../../code/resultCode");
const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const User = require("../../../models/user");

const auth = async (req, res, next) => {
  const app = req.app;
  if ("development" == app.get("env")) {
    return next();
  }

  const accessToken = req.headers["Authorization"];
  if (!accessToken) {
    return res.sendStatus(code.UNAUTHENTICATED);
  }

  const { id } = req.body;
  try {
    let exist = await User.verify(id, accessToken);
    if (!exist) {
      return res.sendStatus(code.UNAUTHENTICATED);
    }
  } catch (err) {
    return res.sendStatus(code.UNAUTHENTICATED);
  }

  next();
};

router.post("/authenticate", controller.authenticate);
router.post("/register", controller.register);

router.post("/likeMovie", controller.addLikeMovie);
router.post("/likeShow", controller.addLikeShow);

router.get("/mypage/:id", controller.mypage);

module.exports = router;
