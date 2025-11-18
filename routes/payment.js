const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route for room payment
router.get('/payment/room/:hotelId/:roomId', paymentController.renderRoomPayment);


// Route for restaurant payment
router.get('/payment/restaurant/:hotelId/:restaurantId', paymentController.renderRestaurantPayment);

// Handle form submit
router.post('/payment/submit', paymentController.submitBooking);

module.exports = router;
