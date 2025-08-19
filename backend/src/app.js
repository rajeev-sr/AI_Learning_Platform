const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const categoriesRoutes = require('./routes/categories');
// const questionsRoutes = require('./routes/questions');
// const submitRoutes = require('./routes/submit');
// const hintRoutes = require('./routes/hint');
// const optimizedRoutes = require('./routes/optimized');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/categories', categoriesRoutes);
// app.use('/api/questions', questionsRoutes);
// app.use('/api/submit', submitRoutes);
// app.use('/api/hint', hintRoutes);
// app.use('/api/optimized', optimizedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));