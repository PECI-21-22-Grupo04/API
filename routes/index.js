const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/reg", (req, res) => {
  res.send("will add a reg page soon");
});
module.exports = router;
