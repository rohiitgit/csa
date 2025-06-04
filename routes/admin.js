const { Router } = require('express');
const { courseRouter } = require('./course');
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken')
const {JWT_ADMIN_PASSWORD} = require("./../config");
const { adminMiddleware } = require('../middlewares/admin');



const adminRouter = Router();

adminRouter.post("/signup", adminMiddleware,  async function(req,res){
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

adminRouter.post("/signin", adminMiddleware, async function(req,res){

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

adminRouter.post("/", adminMiddleware, async function(req,res){

    try{
        const adminId = req.userId;

        const { title, description, imageUrl, price } = req.body;

        const course = await courseModel.create({
            title, description, imageUrl, price
        })

        res.json({
            message: "Course created",
            courseId: course._id
        })
    } catch (e){
        res.status(401).send({
            message: `${e} Error`
        })

    }
})

adminRouter.put("/", adminMiddleware, async function(req, res) {
    try {
        adminId = req.userId;
        // 1. Get courseId and updated fields from req.body
        const { courseId, title, description, imageUrl, price } = req.body;

        // 2. Build the update object only with provided fields
        const fields = ["title", "description", "imageUrl", "price"]
        const updatedFields = {}

        fields.forEach(fields => {
            if (req.body[fields] !== undefined){
                updatedFields[fields] = req.body[fields]
            }
        });
        // 3. Use findOneAndUpdate with filter and update

        const course = await courseModel.findOneAndUpdate(
            { _id: courseId,
                creatorId: adminId
             },
            updatedFields,
            { new: true }
        )

        // 4. Send back a success message or the updated course
        res.json({
            success: true,
            message: "Course updated",
            courseId: course._id
        })
    } catch (e) {
        res.status(500).json({ message: `${e} Error` });
    }
});


adminRouter.get("/bulk", adminMiddleware, async function(req,res){
    try{
        const adminId = req.userId;
        const courses = await courseModel.findOne({
            creatorId: adminId
        })

        res.json({
            message: "All courses",
            courses
        })
    } catch(e){
        res.status(500).json({
            message: `${e} Error`
        })
    }
})

module.exports = {
    adminRouter: adminRouter
}