const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

//routes

//for admin
const adminRoute = require("./src/routes/admin.route");
//for button link
const buttononeRoute = require("./src/routes/buttons/buttonone.route");
const buttontwoRoute = require("./src/routes/buttons/buttontwo.route");
const buttonthreeRoute = require("./src/routes/buttons/buttonthree.route");
//for Banner img
const bannerRoute = require("./src/routes/images/banner.route");
const sidebannerRoute = require("./src/routes/images/sideban.route");
const sidebannertwoRoute = require("./src/routes/images/sidebantwo.route");
const sidelongbannerRoute = require("./src/routes/images/sidelongban.route");
const matchbannerRoute = require("./src/routes/images/matchban.route");

//route declare
app.use("/api/admin", adminRoute); //admin login

//button click route
app.use("/api/button-one", buttononeRoute);
app.use("/api/button-two", buttontwoRoute);
app.use("/api/button-three", buttonthreeRoute);

//banner img route
app.use("/api/banner", bannerRoute);
app.use("/api/sidebanner", sidebannerRoute);
app.use("/api/sidebannertwo", sidebannertwoRoute);
app.use("/api/sidelongbanner", sidelongbannerRoute);
app.use("/api/matchbanner", matchbannerRoute);

module.exports = app;
