const express = require('express');
const router = express.Router();
const { getQuestions, getQuestionById } = require('../controllers/questionsController');

router.get('/', getQuestions);
router.get('/:id', getQuestionById);

module.exports = router;