const CategoryModels = require('../models/categorys')
const uuid = require('uuid/v4')

module.exports = {  
    getCategory: function(req,res){
        CategoryModels.getCategory()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    addCategory: function(req,res){
        const id = uuid()
        const {name} = req.body
        const data = {
            id,
            name
        }
        CategoryModels.addCategory(data)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
    }, 
    updateCategory: function(req,res){
        const CategoryID = req.params.CategoryID
        const data = req.body
        CategoryModels.updateCategory(data,CategoryID)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteCategory: function(req,res){
        const CategoryID = req.params.CategoryID
        CategoryModels.deleteCategory(CategoryID)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      }
   
}