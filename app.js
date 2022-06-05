var express = require('express');
var app = express();
var dict = new Map();
var famousComics = [];
var cors = require("cors");
const bodyParser = require('body-parser')
const path = require("path")

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./build")));
app.listen(process.env.PORT || 5000, function () {
  console.log('App listening on port 5000!');
});
app.get("*", (req, res) => {
  res.sendfile(path.join(__dirname + "/build/index.html"))});



app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});



app.post('/comic', function (req, res) {

  var comicID = req.body.comicID;
  if (dict.has(comicID)) {
    dict.set(comicID, dict.get(comicID) + 1);
  } else {
    dict.set(comicID, 1);
  }
  var ind = famousComics.findIndex(element => element[0] == comicID);
  console.log(comicID, famousComics, ind);
  if (ind == -1) {
    famousComics.push([comicID, dict.get(comicID)]);
  } else {
    famousComics[ind][1] += 1;
  }
  console.log(dict);
  famousComics.sort(function(a, b) {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
  });
  if (famousComics.length > 5) {
    famousComics.pop();
  }

  res.send({famousComics: famousComics});
});