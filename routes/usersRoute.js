const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async(req, res) => {

    const {username , password} = req.body

    try {
        const user = await User.findOne({username , password})
        if(user) {
            res.send(user)
        }
        else{
            return res.status(400).json(error);
        }
    } catch (error) {
      return res.status(400).json(error);
    }

});
router.post("/register", async(req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newuser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword,
        }) 
        await newuser.save()
        res.send('registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});
module.exports=router;