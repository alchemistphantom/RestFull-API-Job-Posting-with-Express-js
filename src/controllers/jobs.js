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
    },
    addJob: function(req,res){
        const id = uuid()
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const date_added = date+' '+time;
        const date_updated = ''
        const {name,description,id_category,salary,location,id_company} = req.body
        const data = {
            id,
            name,
            description,
            id_category,
            salary,
            location,
            id_company,
            date_added,
            date_updated
        }
        jobModels.addJob(data)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
    }
}