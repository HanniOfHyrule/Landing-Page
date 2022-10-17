function checkForURL(inputURL) {
  let valid =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
      inputURL
    );
  return valid;
}

export { checkForURL };
