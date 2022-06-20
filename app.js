const express = require("express");
//const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// middlewares
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routers
app.get("/home", (req, res) => {
    res.render("home");
})

app.get("/test", (req, res) => {
    res.render("home2");
})

app.get("/ecg", (req, res) => {
    res.render("ecg");
})

app.listen(port, () => {
    console.log("Express app is listening on port " + port + " ...");
})
