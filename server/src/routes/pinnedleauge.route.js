const express = require("express");
const pinnedLeagueController = require("../controllers/pinnedleague.controller");

const router = express.Router();

// Route to pin a League ID
router.post("/pin", pinnedLeagueController.uploadpin);

// Route to delete a pinned League ID
router.delete("/unpin", pinnedLeagueController.deletePin);

// Route to get the pinned Featured Match ID
router.get("/get", pinnedLeagueController.getPin);

module.exports = router;
