var express = require("express");
var cors = require("cors");
var request = require("request");
var cheerio = require("cheerio");
const { fstat } = require("fs");
var app = express();

const router = express.Router();
// CORS 설정
app.use(cors());
router.use(cors());

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", cors(), function (req, res) {
  res.sendFile(__dirname + "/Produce_Project.html");
});
app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

// test  ===============================================

app.get("/api/get", function (req, res) {
  let send_data;
  let data_api = req.query.data;

  request(data_api, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      send_data = JSON.parse(body);
      res.send({ result: send_data });
    }
  });
});
