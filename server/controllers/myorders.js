const MyOrder = require("../models").MyOrder;

module.exports = {
  //CREATE
  create(req, res) {
    return MyOrder.create({
      customerid: req.body.customerid
    })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  //DISPLAY ALL / LIST
  list(req, res) {
    return MyOrder.findAll({})
      .then(orders => res.status(200).send(orders))
      .catch(error => res.status(400).send(error));
  }

  //   list(req, res) {
  //     return MyOrder.findAll({
  //       include: [
  //         {
  //           model: Item,
  //           as: "Items"
  //         }
  //       ]
  //     })
  //       .then(orders => res.status(200).send(orders))
  //       .catch(error => res.status(400).send(error));
  //   },
  //DISPLAY ONE ORDER:

  //UPDATE:
  //   update(req, res) {
  //     return Order.findById(req.params.orderId, {
  //       include: [
  //         {
  //           model: Item,
  //           as: "Items"
  //         }
  //       ]
  //     })
  //       .then(order => {
  //         if (!order) {
  //           return res.status(404).send({
  //             message: "Order Not Found"
  //           });
  //         }
  //         return order
  //           .update({
  //             order_id: req.body.order_id || order.order_id
  //           })
  //           .then(() => res.status(200).send(todo)) // Send back the updated order.
  //           .catch(error => res.status(400).send(error));
  //       })
  //       .catch(error => res.status(400).send(error));
  //   }
};
