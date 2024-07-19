const express = require('express');
const dotenv = require('dotenv');
const testRoutes = require('./routes/testRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test client running on port ${PORT}`);
});