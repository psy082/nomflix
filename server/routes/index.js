const code = require("../code/resultCode");

module.exports = app => {
  app.use("/api/user", require("./api/user"));

  app.all("*", (req, res) => {
    res.sendStatus(code.NOT_FOUND);
  });
};
