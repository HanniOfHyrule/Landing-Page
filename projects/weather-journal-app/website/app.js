//Global variables
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const apiKey = "94a9e072a7dec0a791eab7f9876c4621&units=metric";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

/* Function called by event listener */
function clickHandler() {
  if (zip.value.length != 5) {
    zip.classList.add("invalid");
  } else if (feelings.value.length < 2) {
    feelings.classList.add("invalid");
  } else {
    postAndFetch();
  }
}

function getDate() {
  const d = new Date();
  const newDate =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  return newDate;
}

const getTemperature = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + "&zip=" + zip + ",de&appid=" + apiKey);

  try {
    const weather = await res.json();
    console.log(weather);
    return Math.round(weather.main.temp);
  } catch (error) {
    console.error("error about get the weather", error);
  }
};

/* Function to POST entry */
const postEntry = async (url = "", entries = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entries),
  });
  try {
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error("post error", error);
  }
};

const getEntries = async () => {
  try {
    const response = await fetch("/all");
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("get error", error);
  }
};

function postAndFetch() {
  getTemperature(baseURL, zip.value, apiKey).then((temp) => {
    postEntry("/add", {
      zip: zip.value,
      date: getDate(),
      thoughts: feelings.value,
      temp: temp,
    }).then((entries) => {
      updateUI(entries);
    }, clearInput());
  });
}

// Create a new date instance dynamically with JS

function updateUI(entries) {
  const allRecentPosts = document.getElementById("allRecentPosts");
  allRecentPosts.innerHTML = "";

  entries.forEach(function (element) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("entryHolder");

    newDiv.innerHTML = `
      <div class="date"><u>Date:</u> ${element.date}</div>
      <div class="temp"><u>Temperature:</u> ${element.temp}°C</div>
      <div class="content">My feeling: ${element.thoughts}</div>`;

    allRecentPosts.appendChild(newDiv);
  });
}

function clearInput() {
  zip.value = "";
  feelings.value = "";
  zip.classList.remove("invalid");
  feelings.classList.remove("invalid");
}

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", clickHandler);

getEntries().then((entries) => {
  updateUI(entries);
});
