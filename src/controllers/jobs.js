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
      req.body.date_updated = date_updated
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
      searchJob: function(req,res){
        const by = req.query.by
        const words = req.query.words
        jobModels.searchJob(by,words)
        .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
      sortBy: function(req,res){
        const sortBy = req.params.sortBy
        const mode = req.params.mode
        jobModels.sortBy(sortBy,mode)
        .then(result => {
          res.json(result)
        })
        .catch(err => {
          console.log(err)
        })
      },
      paginationJob: function(req,res){
        const limit  = 2
        const page = req.query.page || 1
        let offset =(page-1)*limit
        jobModels.paginationJob(limit,offset)
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}