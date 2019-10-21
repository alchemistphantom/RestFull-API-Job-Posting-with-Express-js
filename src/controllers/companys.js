const companyModels = require('../models/companys')
const uuid = require('uuid/v4')

module.exports = {  
    getCompany: function(req,res){
        companyModels.getCompany()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    } 
}