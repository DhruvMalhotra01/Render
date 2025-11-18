// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err);  // Log the error
  res.status(500).send('Something went wrong. Please try again later.');
};

module.exports = errorHandler;
