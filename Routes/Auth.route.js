const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../Models/Auth.model')

const UserRouter = express.Router()

UserRouter.use(express.json())

UserRouter.post('/register', async(req,res) => {
    const {email,password} = req.body
    try{
        let user = await UserModel.find({email})
        if(user.length===0){
            bcrypt.hash(password, 5, async(err, hash) => {
                if(err){
                    res.send(`Hashing Error :${err}`)
                }else{
                    const newuser = new UserModel({email:email,password:hash})
                    await newuser.save()
                    res.send("Successfully Registered ! Please Login !!")
                    // res.send(newuser)
                }
            });
        }else{
            res.send('Already Registered Please Login !')
        }
    }catch(err){
        res.send(err)
    }
})

UserRouter.post('/login', async(req,res) => {
    const {email,password} = req.body
    try{
        const user = await UserModel.find({email:email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password, async(err,result) => {
                if(result){
                    var token = jwt.sign({ userID:user[0]._id }, 'newuser');
                    res.send({"msg":"Logged in !","usertoken":token})
                }else{
                    res.send('Wrong Credentials !')
                }
            })
        }else{
            res.send('Authentication Failed !')
        }
    }catch(err){
        res.send(err)
    }
})

module.exports = {
    UserRouter
}