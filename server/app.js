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
//for PC Banner img
const PCbannerRoute = require("./src/routes/pcimage/banner.route");
const PCsidebannerRoute = require("./src/routes/pcimage/sideban.route");
const PCsidebannertwoRoute = require("./src/routes/pcimage/sidebantwo.route");
const PCsidelongbannerRoute = require("./src/routes/pcimage/sidelongban.route");
const PCmatchbannerRoute = require("./src/routes/pcimage/matchban.route");

//for Tablet Banner img
const TabletbannerRoute = require("./src/routes/tabimage/banner.route");
const TabletsidebannerRoute = require("./src/routes/tabimage/sideban.route");
const TabletsidebannertwoRoute = require("./src/routes/tabimage/sidebantwo.route");
const TabletsidelongbannerRoute = require("./src/routes/tabimage/sidelongban.route");
const TabletmatchbannerRoute = require("./src/routes/tabimage/matchban.route");

//for Mobile Banner img
const MobilebannerRoute = require("./src/routes/phoneimage/banner.route");
const MobilesidebannerRoute = require("./src/routes/phoneimage/sideban.route");
const MobilesidebannertwoRoute = require("./src/routes/phoneimage/sidebantwo.route");
const MobilesidelongbannerRoute = require("./src/routes/phoneimage/sidelongban.route");
//const MobilematchbannerRoute = require("./src/routes/phoneimage/matchban.route");

//route declare
app.use("/api/admin", adminRoute); //admin login

//button click route
app.use("/api/button-one", buttononeRoute);
app.use("/api/button-two", buttontwoRoute);
app.use("/api/button-three", buttonthreeRoute);

//PC banner img route
app.use("/api/d-banner", PCbannerRoute);
app.use("/api/d-sidebanner", PCsidebannerRoute);
app.use("/api/d-sidebannertwo", PCsidebannertwoRoute);
app.use("/api/d-sidelongbanner", PCsidelongbannerRoute);
app.use("/api/d-matchbanner", PCmatchbannerRoute);

//Tablet banner img route
app.use("/api/t-banner", TabletbannerRoute);
app.use("/api/t-sidebanner", TabletsidebannerRoute);
app.use("/api/t-sidebannertwo", TabletsidebannertwoRoute);
app.use("/api/t-sidelongbanner", TabletsidelongbannerRoute);
app.use("/api/t-matchbanner", TabletmatchbannerRoute);

//PC banner img route
app.use("/api/p-banner", MobilebannerRoute);
app.use("/api/p-sidebanner", MobilesidebannerRoute);
app.use("/api/p-sidebannertwo", MobilesidebannertwoRoute);
app.use("/api/p-sidelongbanner", MobilesidelongbannerRoute);
//app.use("/api/matchbanner", matchbannerRoute);

module.exports = app;
