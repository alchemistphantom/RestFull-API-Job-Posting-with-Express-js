const jobModels = require('../models/jobs')
const uuid = require('uuid/v4')

module.exports = {  
    getJob: function(req,res){
        jobModels.getJob()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}