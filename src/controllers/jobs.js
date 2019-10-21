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
        const date_updated = new Date().toLocaleString
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
      const date_updated = new Date()
      req.body.date_updated = date_updated.toLocaleString
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
       byName: function(req,res){
        const {name} = req.query
        jobModels.byName(name)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      byCompany: function(req,res){
        const company = req.query.company
        jobModels.byCompany(company)
        .then(result => {
          res.json(result)
        })
        .catch(err => {
          console.log(err)
        })
      }
}