var express = require("express");
var session = require("cookie-session");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded( {extended: false});

var app = express();

 

app.use(session({
    secret: "shoppingsecret",
}))

/* creates a list for each category */

.use(function(req, res, next) {
    if (typeof(req.session.shoppinglist) == "undefined") {
        req.session.shoppinglist = [];
    }
    if (typeof(req.session.grocerylist) == "undefined") {
        req.session.grocerylist = [];
    }
    if (typeof(req.session.beerandwinelist) == "undefined") {
        req.session.beerandwinelist = [];
    }
    if (typeof(req.session.otherlist) == "undefined") {
        req.session.otherlist = [];
    }

    next();
})

/* display list */

.get("/list", function(req, res) {
    res.render("list.ejs", {shoppinglist: req.session.shoppinglist, grocerylist: req.session.grocerylist, beerandwinelist: req.session.beerandwinelist, otherlist: req.session.otherlist});
})

.set("views", __dirname + "/views")

.use("/public", express.static("public")) //to get the css in the public/assets folder

/* /list/fresh/add --add produce, meat, seafood, eggs, milk, etc. */

.post("/list/fresh/add/", urlencodedParser, function(req, res) {
    if (req.body.newItem !== "") {
        req.session.shoppinglist.push(req.body.newItem);
    }
    res.redirect("/list");
})

/* /list/grocery/add --add grocery items, cereal, ingredients, canned goods, etc. */

.post("/list/grocery/add/", urlencodedParser, function(req, res) {
    if (req.body.newItem !== "") {
        req.session.grocerylist.push(req.body.newItem);
    }
    res.redirect("/list");
})
/* list/beer-and-wine/add --add beer and wine */

.post("/list/beerandwine/add/", urlencodedParser, function(req, res) {
    if (req.body.newItem !== "") {
        req.session.beerandwinelist.push(req.body.newItem);
    }
    res.redirect("/list");
})
/* list/other/add --shampoo, toothpaste, first aid, etc. */

.post("/list/other/add/", urlencodedParser, function(req,res) {
    if (req.body.newItem !== "") {
        req.session.otherlist.push(req.body.newItem);
    }
    res.redirect("/list");
})
/* /list/delete/:id  --delete item by id */

.get("/list/fresh/delete/:id", function(req, res) {
    if (req.params.id !== "") {
        req.session.shoppinglist.splice(req.params.id, 1);
    }
    res.redirect("/list");
})

.get("/list/grocery/delete/:id", function(req, res) {
    if (req.params.id !== "") {
        req.session.grocerylist.splice(req.params.id, 1);
    }
    res.redirect("/list");
})

.get("/list/beerandwine/delete/:id", function(req, res) {
    if (req.params.id !== "") {
        req.session.beerandwinelist.splice(req.params.id, 1);
    }
    res.redirect("/list");
})

.get("/list/other/delete/:id", function(req, res) {
    if (req.params.id !== "") {
        req.session.otherlist.splice(req.params.id, 1);
    }
    res.redirect("/list");
})
.use(function(req, res, next) {
    res.redirect("/list");
})

.listen(8080);