const companyModels = require('../models/companys')
const multer = require('multer')
const uuid = require('uuid/v4')
const upload = multer({dest:'../uploads/'});

module.exports = {  
    getCompany: function(req,res){
        companyModels.getCompany()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    addCompany: function(req,res){
        const id = uuid()
        const {name,logo,location,description} = req.body
        const data = {
            id,
            name,
            logo,
            location,
            description
        }
        companyModels.addCompany(data)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
    },
    updateCompany: function(req,res){
        const companyID = req.params.companyID
        const data = req.body
        console.log(companyID)
        companyModels.updateCompany(data,companyID)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteCompany: function(req,res){
        const companyID = req.params.companyID
        companyModels.deleteCompany(companyID)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      }
   
}