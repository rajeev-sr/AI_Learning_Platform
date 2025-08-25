const pool=require("../config/db");

const getCategories = async (req, res) => {
  const result= await pool.query('SELECT * FROM categories');
  const rows=result.rows;
  res.json(rows);
};

module.exports = { getCategories };