const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelName: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  roomType: String,
  checkin: Date,
  checkout: Date,
  bookingType: String, // e.g., "room"
  hotelId: mongoose.Schema.Types.ObjectId,
  itemId: mongoose.Schema.Types.ObjectId,
  totalAmount: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
