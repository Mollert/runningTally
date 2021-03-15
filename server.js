
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");


const app = express();
const router = express.Router();
const port = process.env.PORT || 7500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname ,"public")));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname ,"views"));

const mainPage = require("./controllers/mainRoute.js");
const updatePage = require("./controllers/updateRoute.js");

app.use("/update", updatePage);
app.use("/", mainPage);


app.listen(port, () => console.log(`Tuned In and Turned On to port ${port}`));