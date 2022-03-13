// Modules
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const indexRoutes = require("./routes/index");
const uploadRoutes = require("./routes/upload");
const exercisesRoutes = require("./routes/exercises");
const plansRoutes = require("./routes/plans");
const loginRoutes = require("./routes/login");
const clientRoutes = require("./routes/clients");

// Engine
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// use Routes
app.use(indexRoutes);
app.use("/upload", uploadRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/plans", plansRoutes);
app.use("/login", loginRoutes);
app.use("/clients", clientRoutes);

// port listening
app.get("/test", (req, res) => {
  res.render("test");
});
app.listen(5000, () => {
  console.log(`Listening on port 5000...`);
});
