const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const hotelRoutes = require('./routes/hotel');
const dotenv = require("dotenv");
const path = require("path");
const errorHandler = require('./middleware/errorHandler');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const logger = require('./middleware/logger');
app.use(logger);  
 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));



app.use('/hotel', hotelRoutes); 

const authRoutes = require("./routes/auth");
 


app.use("/", authRoutes);  


console.log("Using auth routes...");
console.log("Using booking routes...");

app.get('/hotelBooking', (req, res) => {
  res.render('hotelBooking'); 
});
app.use(errorHandler);

app.get('/', (req, res) => {
  res.render('app');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//Add Static Files chache 
app.use(express.static("public", {
    maxAge: "7d",
    etag: true
}));