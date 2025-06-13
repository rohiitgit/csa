import { Router } from "express";
import { purchaseModel, courseModel } from "../db.js";
import { userMiddleware } from "../middlewares/user.js";
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;

    // should check if the user has bought the course or not

    await purchaseModel.create({
      userId,
      courseId,
    });

    res.json({
      message: "You have successfully bought the course",
    });
  } catch (e) {
    res.status(500).json({ message: `${e} Error` });
  }
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});

  res.json({
    courses,
  });
});

export { courseRouter };
