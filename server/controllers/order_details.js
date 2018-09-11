const OrderDetails = require("../models").order_details;
const Item = require("../models").Item;
module.exports = {
  //CREATE
  //Add an item to an order / (really adding item to order_details)
  create(req, res) {
    return OrderDetails.create({
      OrderId: req.params.orderid,
      ItemId: req.body.itemid,
      quantity: req.body.quantity
    })
      .then(orderitem => res.status(201).send(orderitem))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return OrderDetails.find({
      where: {
        OrderId: req.params.orderid,
        ItemId: req.body.itemid
      }
    })
      .then(item => {
        if (!item) {
          return res.status(404).send({
            message: "Item Not Found"
          });
        }

        return (
          item
            .update(req.body, { fields: Object.keys(req.body) })
            // .update({ quantity: 11 })
            .then(updatedOrderDetail =>
              res.status(200).send(updatedOrderDetail)
            )
            .catch(error => res.status(400).send(error))
        );
      })
      .catch(error => res.status(400).send(error));
  },

  //DISPLAY ALL / LIST
  list(req, res) {
    return OrderDetails.findAll({
      include: [
        {
          model: Item,
          as: "Items"
        }
      ]
    })
      .then(orders => res.status(200).send(orders))
      .catch(error => res.status(400).send(error));
  }
};
