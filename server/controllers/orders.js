const Order = require("../models").Order;
const Item = require("../models").Item;

module.exports = {
  //CREATE
  create(req, res) {
    return Order.create({
      customerId: req.body.customerid
    })
      .then(order => res.status(201).send(order))
      .catch(error => res.status(400).send(error));
  },
  //DISPLAY ALL / LIST
  list(req, res) {
    return Order.findAll({
      include: [
        {
          model: Item,
          as: "Items"
        }
      ]
    })
      .then(orders => res.status(200).send(orders))
      .catch(error => res.status(400).send(error));
  },
  //DISPLAY ONE ORDER:
  showOneOrder(req, res) {
    return Order.findOne({
      attributes: ["id", "customerId"],
      where: { id: req.params.orderid },
      include: [
        {
          model: Item,
          attributes: ["artist", "title"],
          through: {
            attributes: ["quantity", "artist", "title"]

            // attributes: ["quantity"],
            // where: { id: -1 }
          }
        }
      ]
    })
      .then(Orders => res.status(200).send(Orders))
      .catch(error => res.status(400).send(error));
  },
  //UPDATE:
  update(req, res) {
    return Order.findById(1, {
      include: [
        {
          model: Item,
          as: "Items"
        }
      ]
    })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: "Order Not Found"
          });
        }
        return order
          .update({
            order_id: req.body.order_id || order.order_id
          })
          .then(() => res.status(200).send(todo)) // Send back the updated order.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  test(req, res) {
    return Order.findOne({
      attributes: ["id", "customerId"],
      where: { id: req.params.orderid },
      include: [
        {
          model: Item,
          attributes: ["artist", "title"],
          through: {
            attributes: ["quantity", "artist", "title"]

            // attributes: ["quantity"],
            // where: { id: -1 }
          }
        }
      ]
    })
      .then(Orders => res.status(200).send(Orders))
      .catch(error => res.status(400).send(error));
  }
};
