function handleSubmit(event) {
  event.preventDefault();
  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  Client.checkForName(formText);

  console.log("::: Form Submitted :::");

  fetch("/sentiment", {
    method: "POST",
    body: JSON.stringify({ text: formText }),
  }).then(async function (res) {
    const sentiment = await res.json();

    document.getElementById("results").innerHTML = formText;
    document.getElementById("sentiment").innerHTML = JSON.stringify(sentiment);
  });
}

export { handleSubmit };
