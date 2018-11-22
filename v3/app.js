var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campground")
    Comment        = require("./models/comment")
    User           = require("./models/user")



mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")




// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=1502&q=80",
//         description: "A huge granite hill. No bathrooms, no water, beautiful granite."}, function(err, campground){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("new campground: ");
//                 console.log(campground)
//             }
//         });


app.get("/", function(req, res){
    res.render("landing")
});



app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })

});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")

});

//SHOW -- displays more info about a specific campground

app.get("/campgrounds/:id", function(req, res){

    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    });

});

app.listen(3000, function(){
    console.log("server started!!");
});