const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

const planoRoutes = require('./routes/planoRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());

app.use('/api', planoRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Backend rodando perfeitamente!' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});