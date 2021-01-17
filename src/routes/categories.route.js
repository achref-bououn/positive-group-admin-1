const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Retrieving existing Categories

router.get('/', (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return handleError(err);
        res.send(categories)
    })
})

// Creating new categories

router.post('/', (req, res) => {
    const categoryData = req.body;
    categoryData.courses = [];
    const newCategory = new Category(categoryData);
    newCategory.save((err, newCategory) => {
        if (err) return handleError(err);
        res.send(newCategory)
    })
})

module.exports = router;