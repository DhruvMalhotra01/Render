const Hotel = require('../models/Hotel');
//cache 
const cacheQuery = require("../models/cacheQuery");

exports.getHotels = async (req, res) => {
    const hotels = await cacheQuery(
        "hotel_list",
        async () => await Hotel.find(),
        45   // custom TTL: 45 seconds
    );

    res.json(hotels);
};

//
const mongoose = require('mongoose');

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.render('hotelBooking', { hotels });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).send('Server Error');
  }
};

exports.getHotelDetails = async (req, res) => {
  try {
    const hotelName = decodeURIComponent(req.params.hotelName);
    const hotel = await Hotel.findOne({ name: hotelName });

    if (!hotel) {
      return res.status(404).send('Hotel not found');
    }

    // Optional: Fallback in case features is missing
    hotel.rooms = hotel.rooms.map(room => ({
      ...room,
      features: Array.isArray(room.features) ? room.features : ['N/A']
    }));

    res.render('hotelDetails', { hotel });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
