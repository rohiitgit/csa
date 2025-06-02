const { Router } = require('express')

const userRouter = Router();

userRouter.post("/signup", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

userRouter.post("/signin", function(req, res){
    res.json({
        message: "signin endpoint"
    })
})

userRouter.post("/purchases", function(req, res){
    res.json({
        message: "purhcases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}