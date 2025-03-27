const express = require("express");
const router = express.Router();
const FeaturedMatchController = require("../controllers/featuredmatch.controller");

// Route to pin (insert/update) a Featured Match ID
router.post("/pin", FeaturedMatchController.uploadPin);

// Route to clear the pinned Featured Match ID (reset to empty)
router.delete("/unpin", FeaturedMatchController.deletePin);

// Route to get the pinned Featured Match ID
router.get("/get", FeaturedMatchController.getPin);

module.exports = router;
