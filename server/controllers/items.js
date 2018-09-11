const Item = require("../models").Item;
const Order = require("../models").Order;
module.exports = {
  //CREATE ITEM
  create(req, res) {
    return Item.create({
      artist: req.body.artist,
      title: req.body.title,
      label: req.body.label,
      label_num: req.body.label_num,
      price: req.body.price,
      quantity: req.body.quantity,
      active: req.body.active
      // orderId: req.params.orderId
    })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
  //UPDATE ITEM:
  update(req, res) {
    return TodoItem.find({
      where: {
        id: req.params.ItemId,
        orderId: req.params.orderId
      }
    })
      .then(Item => {
        if (!Item) {
          return res.status(404).send({
            message: "Item Not Found"
          });
        }

        return Item.update(req.body, { fields: Object.keys(req.body) })
          .then(updatedItem => res.status(200).send(updatedItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Item.find({
      where: {
        id: req.params.ItemId,
        orderId: req.params.orderId
      }
    })
      .then(Item => {
        if (!Item) {
          return res.status(404).send({
            message: "Item Not Found"
          });
        }

        return Item.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  test(req, res) {
    return Item.findAll({
      attributes: ["quantity", "artist", "title"],
      include: [
        {
          model: Order,
          through: {
            // attributes: ["quantity"],
            // where: { id: -1 }
          }
        }
      ]
    })
      .then(items => res.status(200).send(items))
      .catch(error => res.status(400).send(error));
  }
};
