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
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
    name: "backwoods boys",
    image: "https://farm7.staticflickr.com/6068/6042217185_89a79dbc00.jpg"},
    function(err, Campground){
    if(err){
        console.log("error");
    }else{
        console.log("New");
        console.log(Campground);
    }
});


app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds}); 
});

app.post("/campgrounds", function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds 
    res.redirect("/campgrounds");
});    

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});    


app.listen(process.env.PORT || 8080, () => console.log(catMe('nyan').rainbow));
//app.listen(process.env.PORT, process.env.IP, function(){
//    console.log('YELP CAMP SERVER YELP YELP CAMP SERVER '.custom);
//    console.log(catMe('nyan').rainbow);
//    console.log('YELP CAMP SERVER YELP YELP CAMP SERVER'.custom);
//});