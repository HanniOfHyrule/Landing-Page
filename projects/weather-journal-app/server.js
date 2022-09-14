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
const port = 8080;

//Confirm the server run
const server = app.listen(port, listening);
function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}

const dotenv = require("dotenv");
dotenv.config();

// Personal AP Key for OpenWeatherMap API
// let process = {
//   env: getData("/config"),
// };

//API Key request
// app.get("/config", (req, res) => {
//   res.send(
//     Object.fromEntries(
//       Object.entries(process.env).filter(([key]) =>
//         key.startsWith("WEATHERAPP_")
//       )
//     )
//   );
// });

// Setup empty JS object to hold the data
projectData = [];

//GET route
// app.get("/all", sendData);
// function sendData(req, res) {
//   res.send(projectData);
//   console.log(projectData);
// }

const addData = async (req, res) => {
  console.log(req.body);

  let newInput = {
    zip: req.body.zip,
    thoughts: req.body.thoughts,
  };
  console.log(newInput);

  const currentWeather = await getWeather(newInput.zip);
  let entry = {
    date: getDate(),
    temp: Math.round(currentWeather.main.temp),
    thoughts: newInput.thoughts,
  };
  projectData.unshift(entry);
  res.send(projectData[0]);
  console.log(projectData);
};

app.post("/add", addData);

/* Function to GET Project Data */
function getDate() {
  let d = new Date();
  let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
  return newDate;
}

const getWeather = async (zip) => {
  // const baseURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?zip=${newZip}&appid=${process.env.WEATHERAPP_API_KEY}`;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},de&appid=${process.env.WEATHERAPP_API_KEY}&units=metric`;
  const request = await fetch(baseURL);
  try {
    const weatherData = await request.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log("error about get the weather", error);
  }
};
