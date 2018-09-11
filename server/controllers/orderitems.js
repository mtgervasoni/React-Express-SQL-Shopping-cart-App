const OrderItem = require("../models").OrderItem;

module.exports = {
  //CREATE
  create(req, res) {
    return OrderItem.create({
      orderId: req.body.orderid,
      itemId: req.body.itemid,
      quantity: req.body.quantity
    })
      .then(orderitem => res.status(201).send(orderitem))
      .catch(error => res.status(400).send(error));
  },
  //Display One Order:
  showorder(req, res) {
    return OrderItem.findAndCountAll({
      where: {
        orderId: req.params.orderId
      },
      limit: 1000
    })
      .then(orders => res.status(200).send(orders))
      .catch(error => res.status(400).send(error));
  }
};
