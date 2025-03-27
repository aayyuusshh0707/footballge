const express = require("express");
const router = express.Router();
const {
  buttononeController,
  buttonTwoController,
  buttonThreeController,
} = require("../controllers/navbuttons.controller");

// Routes for Button One
router.get("/one-get", buttononeController.getLink);
router.post("/one-upload", buttononeController.uploadLink);
router.put("/one-update", buttononeController.updateLink);

// Routes for Button Two
router.get("/two-get", buttonTwoController.getLink);
router.post("/two-upload", buttonTwoController.uploadLink);
router.put("/two-update", buttonTwoController.updateLink);

// Routes for Button Three
router.get("/three-get", buttonThreeController.getLink);
router.post("/three-upload", buttonThreeController.uploadLink);
router.put("/three-update", buttonThreeController.updateLink);

module.exports = router;
