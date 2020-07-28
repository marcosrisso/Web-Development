//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/todolistDB',
 {useNewUrlParser: true, useUnifiedTopology: true }
);


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

// listSchema

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model('List', listSchema);




app.get('/', function (req, res) {
let day = date();

  Item.find(( {}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Items successfully added');
        }
      });
      res.redirect('/');
    } else {
    res.render('list', {listTitle: day, newListItems: foundItems});
  }
}
));
});

app.get('/:customListName', function (req, res) {
  const customListName = req.params.customListName;

  List.findOne({name: customListName}, function (err, foundList){
    if (!err) {
      if (!foundList) {
        // create new list
        const list = new List ({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect('/' + customListName);
      } else  {
        // show and existing list
        res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });
});



app.post('/', function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;


  const item = new Item ({
    name: itemName
  });
let day = date();

  if (listName === day) {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({name: listName}, function (err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect('/' + listName);

    }
  );}
});


app.post('/delete', function (req, res) {
  const checkboxItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkboxItemId, function (err){
  if (!err) {
    console.log('Successfully deleted');
    res.redirect('/');
  }

});
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
