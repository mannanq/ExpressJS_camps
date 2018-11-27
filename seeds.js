var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

// Initial "Seed" file. This contains initial camps that will give us some intial camps to work with

var data = [
  {
    name: "Cloud's Rest",
    image:
      'https://pixabay.com/get/e136b60d2af51c22d2524518b7444795ea76e5d004b0144596f1c57fa3e5b3_340.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis iaculis quam, ac facilisis enim tincidunt a. Vivamus ac fringilla quam. Morbi tincidunt euismod euismod. Nunc iaculis ullamcorper arcu ut tincidunt. Integer luctus nibh consequat convallis gravida. Nam velit odio, ultricies sit amet vulputate in, sagittis ac libero. Nulla ac dolor volutpat massa egestas condimentum eu ut nulla. Nam quis velit eget diam facilisis lobortis eu sit amet risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  {
    name: 'Snow Rest',
    image:
      'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104491f3c07da1e9bdbe_340.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis iaculis quam, ac facilisis enim tincidunt a. Vivamus ac fringilla quam. Morbi tincidunt euismod euismod. Nunc iaculis ullamcorper arcu ut tincidunt. Integer luctus nibh consequat convallis gravida. Nam velit odio, ultricies sit amet vulputate in, sagittis ac libero. Nulla ac dolor volutpat massa egestas condimentum eu ut nulla. Nam quis velit eget diam facilisis lobortis eu sit amet risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  {
    name: 'Hippie Rest',
    image:
      'https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104491f3c07da1e9bdbe_340.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis iaculis quam, ac facilisis enim tincidunt a. Vivamus ac fringilla quam. Morbi tincidunt euismod euismod. Nunc iaculis ullamcorper arcu ut tincidunt. Integer luctus nibh consequat convallis gravida. Nam velit odio, ultricies sit amet vulputate in, sagittis ac libero. Nulla ac dolor volutpat massa egestas condimentum eu ut nulla. Nam quis velit eget diam facilisis lobortis eu sit amet risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  }
];

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('removed campgrounds!');
    //Add few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log('Added Camp');
          //Create a comment on each camoground
          Comment.create(
            {
              text: 'This is great but no bathrooms',
              author: 'Homer'
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Create new comment');
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
