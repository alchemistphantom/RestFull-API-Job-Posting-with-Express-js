const CategoryModels = require('../models/categorys');
const utils = require('../helper/utils');
const uuid = require('uuid/v4');

module.exports = {
  getCategory: function(req, res) {
    CategoryModels.getCategory()
        .then((result)=>{
          utils.chekingData(res, result, ' data category is empty');
        })
        .catch((err)=>{
          res.status(400).json('failed to get data');
          console.log(err);
        });
  },
  addCategory: function(req, res) {
    const id = uuid();
    const {name} = req.body;
    const data = {
      id,
      name,
    };
    CategoryModels.verifyCategory(name)
        .then((result) => {
          if (result.length!=0) {
            res.json({
              message: 'data already exist!',
              result});
          } else {
            CategoryModels.addCategory(data)
                .then((result) => {
                  res.json({
                    message: 'success insert category data',
                    result});
                })
                .catch((err) => {
                  res.json({
                    message: 'failed insert category data!',
                    err: err});
                  console.log(err);
                });
          }
        })
        .catch((err) => {
          res.json({
            message: 'failed!',
            err: err});
          console.log(err);
        });
  },
  updateCategory: function(req, res) {
    const CategoryID = req.params.CategoryID;
    const data = req.body;
    CategoryModels.updateCategory(data, CategoryID)
        .then((result) => {
          res.json({
            message: 'success update category',
            result,
          });
        })
        .catch((err) => {
          res.json({
            message: 'faield to update category',
            err,
          });
          console.log(err);
        });
  },
  deleteCategory: function(req, res) {
    const CategoryID = req.params.CategoryID;
    CategoryModels.deleteCategory(CategoryID)
        .then((result) => {
          res.json({
            message: 'success delete category',
            result,
          });
        })
        .catch((err) => {
          res.json({
            message: 'failed delete category data!',
            err: err});
          console.log(err);
        });
  },

};
