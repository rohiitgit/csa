const { Router } = require('express')
const { userModel, purchaseModel } = require('../db')
const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("./../config");
const { userMiddleware } = require('../middlewares/user');

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

userRouter.post("/purchases", userMiddleware, async function(req, res){
    try{

        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId
        })

        res.json({
            purchases
        })
    } catch (e) {

    }
})

module.exports = {
    userRouter: userRouter
}