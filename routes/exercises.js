const express = require("express");
const router = express.Router();

const db = require("../db/dbFunctions.js");

router.get("/", async (req, res) => {
  const exercises = await db.selectAllExercises();
  const parsed_data = JSON.parse(JSON.stringify(exercises))[0];

  if (exercises) {
    res.render("exercises", { exercises: parsed_data });
  } else {
    res.render("exercises", {});
  }
});

router.post("/", async (req, res) => {
  //res.redirect('/exercises?difficulty=easy');
});

module.exports = router;
