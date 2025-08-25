const pool = require('../config/db');

const getQuestions = async (req, res) => {
  const { category } = req.query;
  // const result = await pool.query('SELECT * FROM questions WHERE category = $1', [category]);
  res.json(['q1', 'q2', 'q3']);
};

const getQuestionById = async (req, res) => {
  const { id } = req.params;
  // const result = await pool.query('SELECT * FROM questions WHERE id = $1', [id]);
  res.json(['q4', 'q5', 'q6']);
};

module.exports = { getQuestions, getQuestionById };