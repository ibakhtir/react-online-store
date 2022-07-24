const express = require("express");

const Item = require("../models/Item");

const itemRouter = express.Router({ mergeParams: true });

itemRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Item.find();
      res.status(200).send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  })
  .post(async (req, res) => {
    try {
      const newItem = await Item.create({
        ...req.body
      });
      req.status(201).send(newItem);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  });

itemRouter
  .route("/:itemId")
  .patch(async (req, res) => {
    try {
      const { itemId } = req.params;
      const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
        new: true
      });
      req.status(200).send(updatedItem);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { itemId } = req.params;
      const removedItem = await Item.findById(itemId);

      if (removedItem) {
        await removedItem.remove();
        return res.send(null);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  });

module.exports = itemRouter;
