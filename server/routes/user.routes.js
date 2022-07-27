const express = require("express");

const User = require("../models/User");
const authMiddleware = require("../middleware/auth.middleware");

const userRouter = express.Router({ mergeParams: true });

userRouter.get("/", async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

userRouter.patch("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true
      });

      res.status(200).send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = userRouter;
