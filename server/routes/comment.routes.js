const express = require("express");

const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/auth.middleware");

const commentRouter = express.Router({ mergeParams: true });

commentRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.status(200).send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  })
  .post(authMiddleware, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id
      });

      res.status(201).send(newComment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  });

commentRouter.delete("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();
      return res.send(null);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = commentRouter;
