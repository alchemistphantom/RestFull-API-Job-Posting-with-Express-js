const init = require('../configs/configs')
const jobModels = require('../models/jobs')
const uuid = require('uuid/v4')
const redis = require('../helper/redis')

module.exports = {  
    getJob: function(req,res){
      let {by,words,sortBy,mode,page,limit}= req.query
      let offset;
      if(by!=undefined || words != undefined){
        jobModels.searchJob(by,words)
        .then(result => {
          if(result.length!=0){
            let data = JSON.stringify(result)
            redis.caching(req.originalUrl,data);
            res.json(result)
          }else{
            res.send(words+' Data Not Found')
          }
          })
          .catch(err => {
            console.log(err)
          })
        }else if((sortBy!=undefined || mode != undefined) || (page!=undefined || limit != undefined)){
          if(sortBy==undefined && mode == undefined){
            sortBy='date_added'
            mode = 'asc'
          }else if((page==undefined && limit == undefined) && offset==undefined){
            page=1
            limit=5
          }
          offset =(page-1)*limit
          console.log(sortBy+','+mode+','+limit+','+offset)
         
          jobModels.sortPaging(sortBy,mode,limit,offset)
          .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
        }
        else {
          jobModels.getJob()
          .then(result=>{
            let data = JSON.stringify(result)
            redis.caching(req.originalUrl,data);
              res.json(result)
          })
          .catch(err=>{
              console.log(err)
          })
      }
       
    },
    addJob: function(req,res){
        redis.delCache(req.originalUrl)
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
      redis.delCache(req.originalUrl)
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
        redis.delCache(req.originalUrl)
        const JobID = req.params.JobID
        jobModels.deleteJob(JobID)
        .then(result => {
            res.status(200).json(result)
          })
          .catch(err => {
            console.log(err)
          })
      },
}