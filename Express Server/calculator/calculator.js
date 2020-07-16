const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response) {
response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response) {
  console.log(request.body);

  var num1 = Number(request.body.n1);
  var num2 = Number(request.body.n2);

  var result = num1 + num2;

  response.send("The result is " + result);
});

app.listen(3000, function() {
  console.log("Server Runing port 3000");
});
