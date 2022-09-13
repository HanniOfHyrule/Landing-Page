/* Function to GET Web API Data*/
const getData = async (baseURL) => {
  const res = await fetch(baseURL);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    // Write updated data to DOM elements
  } catch (error) {
    console.log("here is something wrong", error);
  }
};

/* Function to POST data */
const postData = async (baseURL, data) => {
  try {
    const request = await fetch(baseURL, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

// Personal AP Key for OpenWeatherMap API
let process = {
  env: getData("/config"),
};

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

// Create a new date instance dynamically with JS

function updateUI(object) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("entryHolder");
  newDiv.innerHTML = `<div class="date"><u>Date: </u>${object.date}</div>
  <div class="temp"><u>Temperature: </ul>${object.temp}</div>
  <div class='content'><u>Your Feelings: </u>${object.content}</div>
  `;
  document.getElementById("allRecentPosts").appendChild(newDiv);
}

/* Function called by event listener */
function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const newContent = document.getElementById("feelings").value;
  const baseURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?zip=${newZip}&appid=${process.env.WEATHERAPP_API_KEY}`;

  getData(baseURL).then(function (data) {
    postData("/add", {
      zip: zip.value,
      thoughts: feelings.value,
    }).then((object) => {
      updateUI(object);
    });
  });
}

/* Function to GET Project Data */
function getDate() {
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  return newDate
}
