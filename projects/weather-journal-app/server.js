// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
// const { response } = require("express");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}

//API Key request
app.get("/config", (req, res) => {
  res.send(
    Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.startsWith("WEATHERAPP_")
      )
    )
  );
});

//GET route
app.get("/all", sendData);
function sendData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

const addData = async (res, req) => {
  let newInput = {
    zip: req.body.zip,
    thoughts: req.body.thoughts,
  };
  console.log(newInput);

  const currentWeather = await getWeather(newInput.zip);
  let entry = {
    date: getDate(),
    temp: weather.main.temp,
    thoughts: newInput.thoughts,
  };
  projectData.unshift(entry);
  res.send(projectData[0]);
  console.log(projectData);
};

app.post("/add", addData);

const getWeather = async (zip) => {
  const baseURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?zip=${newZip}&appid=${process.env.WEATHERAPP_API_KEY}`;
  const request = await fetch(baseURL + zip);
  try {
    const weatherData = await request.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log("get error", error);
  }
};
