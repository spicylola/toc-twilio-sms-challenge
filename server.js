const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const client = require("twilio")(
    "AC137e1ef9107a509981cad839ff8dc717",
  "402cad46129848de9082e6dd03fb7e60"
);
const port = process.env.PORT || 8080;

const http = require("http");
const server = http.createServer(app);

app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

// app.use(express.urlencoded({ extended: false }));

app.post("/process_form", function (req, res) {
  // Prepare output in JSON format
  phone_number = req.body.phone_number;
  client.messages
    .create({
      from: +19388888249,
      to: +18502074868,
      body: "You just sent an SMS from Node.js using Twilio!",
    })
    .then((message) => console.log(message.sid));
  res.sendStatus(200);
});

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message(req.body);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

var serve_app = app.listen(port, function () {
  var host = process.env.HOST || "http://127.0.0.1";
  var port = serve_app.address().port;

  console.log("Example app listening at %s:%s", host, port);
});
