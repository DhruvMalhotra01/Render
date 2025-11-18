const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

// Render Room Payment Page
exports.renderRoomPayment = async (req, res) => {
  const { hotelId, roomId } = req.params;
  const hotel = await Hotel.findById(hotelId);
  const room = hotel.rooms.id(roomId);
  res.render('payment', { item: room, hotelId, itemId: roomId, type: 'room' });
};

// Render Restaurant Payment Page
exports.renderRestaurantPayment = async (req, res) => {
  const { hotelId, restaurantId } = req.params;
  const hotel = await Hotel.findById(hotelId);
  const restaurant = hotel.diningOptions.id(restaurantId);
  res.render('payment', { item: restaurant, hotelId, itemId: restaurantId, type: 'restaurant' });
};

// Handle Booking Submission
exports.submitBooking = async (req, res) => {
  const {
    bookingType, hotelId, itemId,
    name, email, phone,
    checkInDate, checkOutDate,
    totalAmount
  } = req.body;

  const booking = new Booking({
    bookingType, hotelId, itemId,
    name, email, phone,
    checkInDate, checkOutDate,
    totalAmount
  });

  await booking.save();
  res.send(`<h2>Booking Confirmed!</h2><p>Thank you, ${name}! Your booking is successful.</p>`);
};
