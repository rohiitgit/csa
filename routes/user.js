const { Router } = require('express')
const { userModel } = require('../db')
const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("./../config")

const userRouter = Router();

userRouter.post("/signup", async function(req, res){

    try{
        const { email, password, firstName, lastName } = req.body;
        // TODO: add zod validation and hash the password
        
        await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })

        res.json({
            message: "user is signed up"
        })

    } catch (e) {
        res.status(403).json({
            message: `${e} Error`
        })

    }
})

userRouter.post("/signin", async function(req, res){

    //ideally password should be hashed, and hence you cant compare the user provided password and database password

    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email:email,
            password:password,
        })

        if (user){
            const token = jwt.sign({
                id: user._id
            }, JWT_USER_PASSWORD)
            res.json({
            token:token
            })
        }

        // Can be replaced with cookie based auth / session based auth

        
    } catch (e){
        res.status(401).send({
            message: `${e} Error`
        })
    }

    

})

userRouter.post("/purchases", function(req, res){
    res.json({
        message: "purhcases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}