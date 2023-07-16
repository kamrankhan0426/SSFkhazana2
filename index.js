const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const router = express.Router();
const routes = require('./database/DatabaseActions')
const PORT = process.env.PORT || 4000; 
const middleware = (req, res, next) => {
  next();
};


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(middleware);
app.use('/', routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
  

require("dotenv").config();
require("./database/connection");




app.listen(PORT, () => {
  console.log("Listening on port 4000");
});

// Error handling middleware
app.use((err, req, res, next) => { 
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


