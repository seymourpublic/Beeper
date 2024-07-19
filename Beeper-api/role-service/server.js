const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const roleRoutes = require('./routes/roleRoutes');
const { swaggerUi, specs } = require('./config/swagger');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/roles', roleRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});