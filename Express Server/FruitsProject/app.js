//jshint esversion: 6

const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true });

// schema constructor
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// new fruit
const apple = new Fruit ({
  name: 'Apple',
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: 'Solid for a fruit'
});

//new fruit
const Orange = new Fruit ({
  name: {
    type: String,
    required: [true, "Missing Name!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: 'A classic'
});

// new med
const ibuprofeno = new Fruit ({
  name: "Ibuprofeno",
  rating: 9,
  review: 'Useful'
});

ibuprofeno.save();

// client constructor
const clientSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteMed: fruitSchema
});

const Client = mongoose.model('Client', clientSchema);

// new client
const client = new Client ({
  name: "Ailen",
  age: 30,
  favoriteMed: ibuprofeno
});

// client.save();

// const banana = new Fruit ({
//   name: "Banana",
//   rating: 10,
//   review: "The Best"
// });
//
// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 9,
//   review: "Expensive"
// });
//
// const pear = new Fruit ({
//   name: "Pear",
//   rating: 7,
//   review: "Memories"
// });

// Fruit.insertMany([banana, kiwi, pear], function (err) {
//   if (err) {
//     console.log (err);
//   } else {
//     console.log('Successfully added!');
//   }
// });

// find method
Fruit.find(function (err, fruits) {
  if (err) {
    console.log (err);
  } else {
    console.log (fruits);
  }
});

// fruits.forEach(function(fruit) {
//   console.log(fruit.name);
// });

// mongoose.connection.close();

// update method
Fruit.updateOne({_id: '5f1a4aa378c77615a89975e4'}, {rating: 8}, function (err){
  if (err) {
    console.log(err);
  } else {
    console.log('Item updated!');
  }
} );

// // mongodb driver .find method
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits);
//     callback(fruits);
//   });
// };
