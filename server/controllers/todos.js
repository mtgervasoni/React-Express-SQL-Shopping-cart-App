const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
  //CREATE
  create(req, res) {
    return Todo.create({
      title: req.body.title
    })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  //DISPLAY ALL / LIST
  list(req, res) {
    return Todo.findAll({
      include: [
        {
          model: TodoItem,
          as: "todoItems"
        }
      ]
    })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
  //UPDATE:
  update(req, res) {
    return Todo.findById(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems"
        }
      ]
    })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: "Todo Not Found"
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title
          })
          .then(() => res.status(200).send(todo)) // Send back the updated todo.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
