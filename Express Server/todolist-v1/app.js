//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});

// itemSchema
const itemSchema = {
  name: String
};

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item ({
  name: 'Welcome to your to-do list'
});

const item2 = new Item ({
  name: 'Hit the + button to add items'
});

const item3 = new Item ({
  name: 'Hit the checkbox to detele item'
});


const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Items successfully added');
//   }
// });


app.get('/', function (req, res) {
let day = date();

  Item.find(( {}, function (err, foundItems) {

    res.render('list', {listTitle: day, newListItems: foundItems});
  }));

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
