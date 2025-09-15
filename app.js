const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json()); //this use used when we recieve a post or put request. parse the inconming request and add it to req.body by converting json into java script object
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

//home page route
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/searchpage", async (req, res) => {
  const query = req.query.input;
  try {
    const response = await fetch(
      `https://huggingface.co/api/datasets?search=${query}` //endpoint
    );
    const data = await response.json(); //when sending a http request to api . it return data in json. this converst it ino javascript object
    res.render("searchpage.ejs", { datasets: data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching datasets. Try again later!");
  }
});

app.listen(8080, () => {
  console.log(`server is listing to port 8080`);
});
