const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    // Try to create a test collection to verify write access
    const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
    return Test.create({ name: 'Connection test' });
  })
  .then(() => {
    console.log('✅ Successfully created test document!');
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('✅ MongoDB connection closed.');
    console.log('✅ All tests passed! MongoDB is properly connected.');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });