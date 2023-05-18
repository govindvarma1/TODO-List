//jshint esversion:6

const express=require("express");
const bodyParser= require("body-parser");
const app= express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var dayList=["Complete Numerical Methods Assignment", "Submit DAA Project"];
var workList=[];

app.get("/", function(req, res) {
    var today= new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);
    res.render('list', {title: day, list: dayList});

})

app.post("/", function(req,res) {
    var item=req.body.newItem;
    if(req.body.list === "Work List") {
        workList.push(item);
        res.redirect("/work");
    }
    else {
        dayList.push(item);
        res.redirect("/");
    }
})

app.get("/work", function(req, res) {
    res.render("list", {title: "Work List", list: workList});
})


app.listen(3000, function(){
    console.log("the server started on port 3000");
})