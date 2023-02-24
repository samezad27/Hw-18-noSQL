const router = require("express").Router();
const { User } = require("../../models");

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get("/", (req, res) => {});

//TODO - ROUTE THAT CREATES A NEW USER
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get("/:userId", (req, res) => {});

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put("/:userId", (req, res) => {});

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete("/:userId", (req, res) => {});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put("/:userId/friends/:friendId", (req, res) => {});

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete("/:userId/friends/:friendId", (req, res) => {});

module.exports = router;
