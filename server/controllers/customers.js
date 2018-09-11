const Customer = require("../models").Customer;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
//import validation files
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

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

  //LOGIN a Customer:
  login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    //Check Validations:
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // const email = req.body.email;
    const password = req.body.password;

    //Find customer by email:
    Customer.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        //Check for user
        if (!user) {
          errors.email = "User not found";
          return res.status(404).json(errors);
        }
        //Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            //user passed: generate token:
            const payload = {
              id: user.id,
              name: user.name
            }; // Create JWT Payload
            // User Matched
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 604800 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        });
      })
      .catch(error => res.status(400).send(error));
  },

  //GET CURRENT CUSTOMER/USER:

  //@route GET request to api/users/current
  //@desc: Return Current User (Token)
  //@access: private

  current(req, res) {
    // res.json({ msg: "Success" });
    // res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
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
