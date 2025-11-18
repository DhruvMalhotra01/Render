// middleware/authMiddleware.js
module.exports = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');  // Redirect to login if not authenticated
    }
    next();  // Continue to the next middleware or route handler
  };
  


const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(); // Proceed to the next middleware/route if authenticated
  } else {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
};

module.exports = ensureAuthenticated;
