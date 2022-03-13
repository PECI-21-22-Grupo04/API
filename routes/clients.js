const express = require("express");
const router = express.Router();

const db = require("../db/dbFunctions.js");

router.get("/", async (req, res) => {
  const clients = await db.selectAllClients("chave");
  const parsed_data = JSON.parse(JSON.stringify(clients))[0];

  console.log(clients);

  if (clients) {
    res.render("clients", { clients: parsed_data });
  } else {
    res.render("clients", { clients: {} });
  }
});

module.exports = router;
