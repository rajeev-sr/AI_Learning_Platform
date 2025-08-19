const getCategories = (req, res) => {
  res.json(['AI', 'ML', 'DL', 'GenAI']);
};

module.exports = { getCategories };