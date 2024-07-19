const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');

    const storage = new GridFsStorage({
      url: process.env.MONGO_URI,
      file: (req, file) => {
        return {
          bucketName: 'uploads', // Setting collection name
          filename: `${Date.now()}-${file.originalname}`,
        };
      },
    });

    const upload = multer({ storage });
    module.exports = { conn, upload };
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
