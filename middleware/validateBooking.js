// middlewares/validateBooking.js

const validateBooking = (req, res, next) => {
  const { hotelName, firstName, lastName, email, roomType, checkin, checkout } = req.body;

  if (!hotelName || !firstName || !lastName || !email || !roomType || !checkin || !checkout) {
    return res.status(400).send("All fields must be filled.");
  }

  // Additional validation for check-in/check-out date
  if (new Date(checkin) >= new Date(checkout)) {
    return res.status(400).send("Check-out date must be after check-in date.");
  }

  next();  // Pass control to the next middleware or route handler
};

module.exports = validateBooking;
