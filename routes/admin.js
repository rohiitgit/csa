const { Router } = require('express');
const { courseRouter } = require('./course');

const adminRouter = Router();

adminRouter.post("/signup", function(req,res){
    res.json({
        message: "admin signup endpoint"
    })
})

adminRouter.post("/signin", function(req,res){
    res.json({
        message: "admin signin endpoint"
    })
})

adminRouter.post("/cour", function(req,res){
    res.json({
        message: "create course endpoint"
    })
})

adminRouter.put("/course", function(req,res){
    res.json({
        message: "create course endpoint"
    })
})

adminRouter.get("/course/bulk", function(req,res){
    res.json({
        message: "create course endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}