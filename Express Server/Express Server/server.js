const express = require("express");

const app =  express();

app.get("/", function(request, response) {
  response.send("Page");
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
