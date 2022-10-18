function updateUiWithSentiment(sentiment) {
  console.log(sentiment);

  document.getElementById("results").innerHTML = JSON.stringify(
    sentiment.agreement
  );
  document.getElementById("sentiment").innerHTML = JSON.stringify(
    sentiment.subjectivity
  );
  document.getElementById("polarity").innerHTML = JSON.stringify(
    sentiment.score_tag
  );
  document.getElementById("confidence").innerHTML = JSON.stringify(
    sentiment.confidence
  );
  document.getElementById("irony").innerHTML = JSON.stringify(sentiment.irony);
}

function handleSubmit(event) {
  window.event.preventDefault();
  let url = document.getElementById("url").value;

  postContent(url);
}

function postContent(url, callback) {
  if (Client.isValidURL(url)) {
    fetch("/sentiment", {
      method: "POST",
      body: JSON.stringify({ text: url }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async function (res) {
      const sentiment = await res.json();
      callback ? callback(sentiment) : updateUiWithSentiment(sentiment);
    });
  } else {
    alert("please enter a vaild URL!");
  }
}

export { handleSubmit, updateUiWithSentiment };
