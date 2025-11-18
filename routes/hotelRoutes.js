const express = require("express");
const router = express.Router();
const cache = require("../middleware/cache");
const hotelController = require("../controllers/hotelController");

// Cache for ONLY 30 seconds
router.get("/hotels", cache(30), hotelController.getHotels);

// Cache for 5 minutes
router.get("/hotel/:id", cache(300), hotelController.getHotelDetails);

module.exports = router;
