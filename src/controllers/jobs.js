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
    }, 
    updateJob: function(req,res){
      const JobID = req.params.JobID
      console.log(JobID)
      const data = req.body
      jobModels.updateJob(data,JobID)
      .then(result => {
          res.json(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
      deleteJob: function(req,res){
        const JobID = req.params.JobID
        jobModels.deleteJob(JobID)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      searchJobbyName: function(req,res){
        const {jobName} = req.query
        jobModels.searchJobbyName(jobName)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      }
}