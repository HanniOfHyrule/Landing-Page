const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to hold the data
projectData = [];

const addData = async (req, res) => {
  let newInput = {
    zip: req.body.zip,
    thoughts: req.body.thoughts,
  };

  const currentWeather = await getWeather(newInput.zip);
  let entry = {
    date: getDate(),
    temp: Math.round(currentWeather.main.temp),
    thoughts: newInput.thoughts,
  };
  projectData.unshift(entry);
  res.send(projectData[0]);
};

app.post("/add", addData);

/* Function to GET Project Data */
function getDate() {
  let d = new Date();
  let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
  return newDate;
}

const getWeather = async (zip) => {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},de&appid=${process.env.WEATHERAPP_API_KEY}&units=metric`;
  const request = await fetch(baseURL);
  try {
    const weatherData = await request.json();
    return weatherData;
  } catch (error) {
    console.log("error about get the weather", error);
  }
};
