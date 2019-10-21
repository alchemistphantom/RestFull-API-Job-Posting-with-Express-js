const express = require('express')
const bodyParser = require('body-parser')
const config = require('./src/configs/configs')

const app = express()
const port = config.port

app.listen(port,function(){
    console.log(`Server Listening on port ${port}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

module.exports = app