const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const groupRoutes = require('./routes/groupRoutes');
const { swaggerUi, specs } = require('./config/swagger');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/groups', groupRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});