const express = require('express')
const Route = express.Router()

const CategoryControllers = require('../controllers/categorys')

Route
.get('/',CategoryControllers.getCategory)
.post('/',CategoryControllers.addCategory)
.patch('/:CategoryID',CategoryControllers.updateCategory)
.delete('/:CategoryID',CategoryControllers.deleteCategory)

module.exports = Route