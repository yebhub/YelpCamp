var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

<!DOCTYPE  html>
app.get("/", function(req, res){
    res.render("landing")
});

 var campgrounds = [
        {name: "Crystal Lake", image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=1502&q=80"},
        {name: "Friend Point", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1500&q=80"},
        {name: "Blade's End", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c0b66b816b4653b3b0e02af008c82403&auto=format&fit=crop&w=1500&q=80"}
    ]

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")

});

app.listen(3000, function(){
    console.log("server started!!");
});