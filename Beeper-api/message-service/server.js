const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');
const { swaggerUi, specs } = require('./config/swagger');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/messages', messageRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});