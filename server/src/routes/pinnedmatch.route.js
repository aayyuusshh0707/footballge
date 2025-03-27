const express = require("express");
const pinnedMatchController = require("../controllers/pinnedmatch.controller");

const router = express.Router();

// Route to pin a League ID
router.post("/pin", pinnedMatchController.uploadpin);

// Route to delete a pinned League ID
router.delete("/unpin", pinnedMatchController.deletePin);

// Route to get the pinned Featured Match ID
router.get("/get", pinnedMatchController.getPin);


module.exports = router;
