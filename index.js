const express = require('express')
const { connection } = require('./Config/db')
const { UserRouter } = require('./Routes/Auth.route')

require('dotenv').config()
const app = express()
app.use(express.json())

app.use('/',UserRouter)

app.listen(process.env.port, async (req,res) => {
    try{
        await connection
        console.log('Connected to DB')
    }catch(err){
        console.log(err)
    }
    console.log(`Running on port ${process.env.port}`)
})
