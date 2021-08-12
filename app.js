// Requiring express and https for initializing the constant "app"
const express = require("express");
const https = require("https");
const date = require(__dirname + "/date.js"); // Request date.js feature
const app = express();

console.log(date);

// Global Static String array
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

// Tell Express to use body-parser
app.use(express.urlencoded({extended: true}));
// Tell Express to use static files
app.use(express.static("public")); 

// App to use EJS 
app.set("view engine", "ejs");

// 4 Client Request and Response from the Server
app.get("/", function(req, res){
    // Using export function in getDate() from date.js
    const day = date.getDate();
    
    // Render list ejs variables 
    res.render("list", {listTitle: day, newListItems: items});
});

// 1 Post value will pass through this function
app.post("/", function(req, res) {
    console.log(req.body);
    const item = req.body.newItem;

    // Check if statement for whether it's work checklist or not
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        // 2 Append item into the items array
        items.push(item);
        // 3 Redirect to home route again to refresh page 
        res.redirect("/");
    }
});

// Delete item request
app.post("/deleteItem", function(req, res) {
    const item = req.body.button;

    // Check if statement for whether it's work checklist or not
    if (req.body.list === "Work") {
        workItems.splice(workItems.indexOf(item), 1);
        res.redirect("/work");
    } else {
        // 2 Append item into the items array
        items.splice(items.indexOf(item), 1);
        // 3 Redirect to home route again to refresh page 
        res.redirect("/");
    }
})

// Work EJS Pages
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.post("/work", function(req,res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

// About EJS pages
app.get("/about", function(req, res) {
    res.render("about");    
})

// Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT || 3000, function() {
    console.log("server is listening on port 3000");
});