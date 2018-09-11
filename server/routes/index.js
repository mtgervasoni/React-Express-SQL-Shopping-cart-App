// const todosController = require("../controllers").todos;
// const todoItemsController = require("../controllers").todoItems;
const ordersController = require("../controllers").orders;
const ItemsController = require("../controllers").items;
const orderItemsController = require("../controllers").orderitem;
const customersController = require("../controllers").customer;
const orderDetailsController = require("../controllers").orderdetails;
const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Scorpio Music API!"
    })
  );

  //CUSTOMERS
  //create a customer
  app.post("/api/customer", customersController.create);
  //Register customer with validations:
  app.post("/api/register", customersController.register);
  // TODO: update customer info
  //Login:
  app.post("/api/login", customersController.login);
  //@route GET request to api/user/current
  //@desc: Return Current User (Token)
  //@access: Private:
  // app.get(
  //   "/api/user/current",
  //   passport.authenticate("jwt", { session: false }),
  //   customersController.current
  // );
  //TODO: Might have to fix:
  app.get(
    "/api/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json({ msg: "Success" });
      res.json(req.user);
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      });
    }
  );

  //ORDERS:
  //create an order:
  app.post("/api/orders", ordersController.create);
  //list an order:
  app.get("/api/orders", ordersController.list);
  //update an order:
  app.put("/api/orders/:orderId", ordersController.update);
  //Display an order:
  app.get("/api/orders/:orderid", ordersController.showOneOrder);

  //ITEMS:
  app.post("/api/orders/:orderId/items", ItemsController.create);

  app.get("/api/test/:orderid", ordersController.test);

  //ORDER DETAILS:
  app.get("/api/test2", orderDetailsController.list);
  //Add an Order item / Add to an order
  app.post("/api/orders/addto/:orderid", orderDetailsController.create);
  //update order quantity (..)
  app.post("/api/orders/update/:orderid", orderDetailsController.update);

  // For any other request method on order items, we're going to return "Method Not Allowed"
  app.all("/api/orders/:orderid/items", (req, res) =>
    res.status(405).send({
      message: "Method Not Allowed"
    })
  );

  //ORDERITEMS:
  //Add an Order item / Add to an order
  // app.post("/api/orders/additem", orderItemsController.create);
  // //show an order:
  // app.get("/api/orders/show/:orderId", orderItemsController.showorder);

  //TODOS
  // app.post("/api/todos", todosController.create);
  // app.get("/api/todos", todosController.list);
  // app.put("/api/todos/:todoId", todosController.update);

  //TODO ITEMS:
  // app.post("/api/todos/:todoId/items", todoItemsController.create);
  // app.post("/api/todos/:todoId/items", todoItemsController.create);
  // app.put("/api/todos/:todoId/items/:todoItemId", todoItemsController.update);
  // app.delete(
  //   "/api/todos/:todoId/items/:todoItemId",
  //   todoItemsController.destroy
  // );

  // app.post("/api/orders/:todoId/items", todoItemsController.create);
  // app.put("/api/orders/:todoId/items/:todoItemId", todoItemsController.update);
  // app.delete(
  //   "/api/orders/:todoId/items/:todoItemId",
  //   todoItemsController.destroy
  // );
  //TEST ROUTE
  // app.get("/api/test", ordersController.test);
  // app.get("/api/test", ItemsController.test);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  // app.all("/api/todos/:todoId/items", (req, res) =>
  //   res.status(405).send({
  //     message: "Method Not Allowed"
  //   })
  // );
};
