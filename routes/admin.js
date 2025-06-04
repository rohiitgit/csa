const { Router } = require('express');
const { courseRouter } = require('./course');
const { adminModel } = require('../db');
const jwt = require('jsonwebtoken')

const JWT_ADMIN_PASSWORD = 'starterpackboss'

const adminRouter = Router();

adminRouter.post("/signup", async function(req,res){
    try{
        const { email, password, firstName, lastName } = req.body;
        // TODO: add zod validation and hash the password
        
        await adminModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })

        res.json({
            message: "user admin created"
        })

    } catch (e) {
        res.status(403).json({
            message: `${e} Error`
        })

    }
})

adminRouter.post("/signin", async function(req,res){

    //ideally password should be hashed, and hence you cant compare the user provided password and database password

    try{
        const { email, password } = req.body;

        const user = await adminModel.findOne({
            email:email,
            password:password,
        })

        if (user){
                
            const token = jwt.sign({
                id: user._id
            }, JWT_ADMIN_PASSWORD)
            // Can be replaced with cookie based auth / session based auth

            res.json({
                token:token
            })
        }


    } catch (e){
        res.status(401).send({
            message: `${e} Error`
        })
    }

})

adminRouter.post("/", function(req,res){
    res.json({
        message: "create course endpoint"
    })
})

adminRouter.put("/", function(req,res){
    res.json({
        message: "create course endpoint"
    })
})

adminRouter.get("/bulk", function(req,res){
    res.json({
        message: "create course endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}