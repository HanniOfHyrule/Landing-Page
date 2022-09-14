//Global variables
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");

/* Function called by event listener */
function clickHandler() {
  if (zip.value.length != 5) {
    zip.classList.add("invalid");
    console.log("Invalid zip code");
  } else if (feelings.value.length < 2) {
    feelings.classList.add("invalid");
    console.log("answer to short");
  } else {
    postAndFetch();
  }
}

/* Function to GET Project Data */
function postAndFetch() {
  postData("/add", { zip: zip.value, thoughts: feelings.value }).then(
    (object) => {
      updateUI(object);
    },
    clearInput()
  );
}

/* Function to POST data */
const postData = async (baseURL, data) => {
  const request = await fetch(baseURL, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log("post error", error);
  }
};

// Create a new date instance dynamically with JS

function updateUI(object) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("entryHolder");
  newDiv.innerHTML = newDiv.innerHTML = `
      <div class="date"><u>Date:</u> ${object.date}</div>
      <div class="temp"><u>Temperature:</u> ${object.temp}°C</div>
      <div class="content">${object.thoughts}</div>
  `;
  document.getElementById("allRecentPosts").appendChild(newDiv);
}

function clearInput() {
  zip.value = "";
  feelings.value = "";
  zip.classList.remove("invalid");
  feelings.classList.remove("invalid");
}

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", clickHandler);
