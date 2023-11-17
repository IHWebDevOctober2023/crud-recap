const express = require('express');
const router = express.Router();
// FIRST STEP: Require the model
const User = require("../models/User.model");

const noHomers = require("../middlewares/middleware1")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// SECOND STEP: We want to create a route with the POST method
// The client is going to send us info
// THE C of CRUD
router.post("/user/create", noHomers, (req, res) => {
  /*   
  The user is sending us something like this using the form
  const body = {
      username: "Clara",
      email: "clara@awesometuppers.com",
      password: "lostrescerditos"
  } 
  */
  const ditto = req.body.username; // the name of the variable contains the value. It's good practice if we name it the same
  const email = req.body.email;
  const password = req.body.password;

  // console.log(req.body);

  User.create({ username: ditto, email: email, password: password })
    .then((newUser) => {
      // console.log(newUser);
      res.send(newUser);
    })
    .catch((error) => console.error(error));
})

// THE R of CRUD
router.get("/all-users", (req, res) => {
  User.find()
    .then((allUsersDitto) => {
      res.send(allUsersDitto);
      // res.json(allUsersDitto)
      // res.render("index", {allUsersDitto})
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error, I don't know what you are asking")
    });
});

//The U of CRUD
router.put("/user/update/:dittoID", (req, res) => {
  const userID = req.params.dittoID;

  const ditto = req.body.username; // the name of the variable contains the value. It's good practice if we name it the same
  const email = req.body.email;
  const password = req.body.password;

  User.findByIdAndUpdate(userID, { username: ditto, email: email, password: password }, { new: true })
    .then((updatedDitto) => {
      res.send(updatedDitto);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error, I don't know what you are asking")
    });
})

//The D of CRUD
router.delete("/user/delete/:dittoID", (req, res) => {
  const userID = req.params.dittoID;

  User.findByIdAndDelete(userID)
    .then((deletedDitto) => {
      res.send(deletedDitto);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error, I don't know what you are asking")
    });
})

module.exports = router;
