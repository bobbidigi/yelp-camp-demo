var express = require("express"),
 app        = express(),
 catMe      = require("cat-me"),
 colors     = require("colors"),
 mongoose   = require("mongoose"),
 bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp"); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
colors.setTheme({
  custom: ['bold', 'magenta']
});

// MONGO SCHEMA
var campgroundSchema = new mongoose.Schema({
    name:  String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name: "backwoods boys",
//     image: "https://farm7.staticflickr.com/6068/6042217185_89a79dbc00.jpg",
//     description: "Achres of wild life, fishing, and fun. No bathrooms or showers only fresh river water"
//     },
//     function(err, Campground){
//     if(err){
//         console.log("error");
//     }else{
//         console.log("New");
//         console.log(Campground);
//     }
// });

app.get("/", function(req, res){
   res.render("landing"); 
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
   
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log("err");
       }else{
           res.render("index", {campgrounds: allCampgrounds}); 
       } 
    });
});

// CREATE - add new campground
app.post("/campgrounds", function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log("error");
       }else{
            //redirect back to campgrounds 
            res.redirect("/campgrounds");
       } 
    });
});    

// NEW - form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});    

// SHOW - shows more info from a specific ID
app.get("/campgrounds/:id", function(req, res){
    // find id
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
        console.log("err");
       }else{
        // show template with for that campground
        res.render("show", {campground: foundCampground});       
       } 
    });
});  


app.listen(process.env.PORT || 8080, () => console.log(catMe('nyan').rainbow));
//app.listen(process.env.PORT, process.env.IP, function(){
//    console.log('YELP CAMP SERVER YELP YELP CAMP SERVER '.custom);
//    console.log(catMe('nyan').rainbow);
//    console.log('YELP CAMP SERVER YELP YELP CAMP SERVER'.custom);
//});