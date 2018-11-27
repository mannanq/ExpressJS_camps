var express = require('express'),
  app = express(),
  request = require('request'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  seedDB = require('./seeds');

seedDB();
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Campground.create(
//   {
//     name: 'YellowStone',
//     image:
//       'https://pixabay.com/get/e830b90e20f3083ed1584d05fb1d4e97e07ee3d21cac104491f2c770a1ebb2b8_340.jpg',
//     description: 'The YellowStone National Park'
//   },
//   function(err, camp) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('new one');
//       console.log(camp);
//     }
//   }
// );

app.get('/', function(req, res) {
  res.render('homepage');
});

// INDEX - Show all Camps
app.get('/campgrounds', function(req, res) {
  // GET campgrounds from DB and render
  Campground.find({}, function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render('./campgrounds/index', { campgrounds: camp });
    }
  });
});

//CREATE - Add a new campground
app.post('/campgrounds', function(req, res) {
  //get data from form and add to campground array
  // redirect back to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCamp = { name: name, image: image, description: description };
  //Create a new campground and save to DB
  Campground.create(newCamp, function(err, newCampground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

//NEW - Show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  //for the form that sends data to the post route
  res.render('./campgrounds/new');
});

//SHOW - shows more info on the camground. Description from the Campground Schema

app.get('/campgrounds/:id', function(req, res) {
  //find campground with provided ID
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCamp) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCamp);
        //render show template with that campground
        res.render('./campgrounds/show', { campground: foundCamp });
      }
    });
});

// =======================
// COMMENTS ROUTES
// =======================

app.get('/campgrounds/:id/comments/new', function(req, res) {
  //find campground by ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render('./comments/new', { campground: campground });
    }
  });
});

app.post('/campgrounds/:id/comments', function(req, res) {
  // look up campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //conenct new comment to campground
          campground.comments.push(comment);
          campground.save();
          //redirect to campground show page (camp we added a comment for)
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

app.listen(5000, function() {
  console.log('started YelpCamp');
});
