// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

//Confirm the server run
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}

// Setup empty JS object to hold the data
projectData = [];

//POST route
app.post("/add", async function (req, res) {
  projectData.push(await req.body);
  res.send(projectData);
});

//GET route
app.get("/all", async function (req, res) {
  res.send(projectData);
});
