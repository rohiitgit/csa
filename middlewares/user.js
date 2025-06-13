import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function userMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);

    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        message: "You are not signed in",
      });
    }
  } catch (e) {
    res.status(401).json({
      error: `Encountered the following error: ${e}`,
    });
  }
}

export { userMiddleware };
