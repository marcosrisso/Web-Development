//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = requiere('mongoose');
const date = require(__dirname + '/date.js');
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});

const itemSchema = {
  name: String
};

app.get('/', function (req, res) {

let day = date();

res.render('list', {listTitle: day, newListItems: items});

});

app.post('/', function (req, res) {

  let item = req.body.newItem;

console.log(req.body);

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }


});


app.get('/work', function (req, res) {
  res.render('list', {listTitle: 'Work List', newListItems: workItems});

});

app.get('/about', function (req, res) {
  res.render('about');
});

app.post('/work', function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});


app.listen(3000, function () {
  console.log('Server running on port 3000');
});

//
