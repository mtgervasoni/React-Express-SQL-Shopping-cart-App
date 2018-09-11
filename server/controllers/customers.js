const Customer = require("../models").Customer;
const validateRegisterInput = require("../../validation/register");
const bcrypt = require("bcryptjs");
module.exports = {
  //register customer
  register(req, res) {
    if (req.body) {
      const { errors, isValid } = validateRegisterInput(req.body);
      //Check Validation:
      if (!isValid) {
        return res.status(400).json(errors);
      }
    }
    Customer.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        // const newUser = new Customer({
        //   name: req.body.name,
        //   email: req.body.email,
        //   password: req.body.password
        // });
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            // newUser
            //   .save()
            Customer.create(newUser)
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  },

  //CREATE CUSTOMER
  create(req, res) {
    return Customer.create({
      name: req.body.name,
      email: req.body.email
    })
      .then(customer => res.status(201).send(customer))
      .catch(error => res.status(400).send(error));
  },
  //UPDATE Customer:
  update(req, res) {
    return Customer.find({
      where: {
        id: req.params.customerid
      }
    })
      .then(customer => {
        if (!customer) {
          return res.status(404).send({
            message: "Customer Not Found"
          });
        }

        return (
          customer
            .update(req.body, { fields: Object.keys(req.body) })
            // .update({ quantity: 11 })
            .then(updatedCustomerDetail =>
              res.status(200).send(updatedCustomerDetail)
            )
            .catch(error => res.status(400).send(error))
        );
      })
      .catch(error => res.status(400).send(error));
  }
};
