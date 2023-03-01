const router = require("express").Router();
const { User } = require("../../models");

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    res.status(200).json(users);
  });
});

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
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get("/:userId", (req, res) => {
  User.findById(req.params.userId, function (err, singleUser) {
    if (err) {
      res.status(500).send("cannot find user");
    } else {
      res.status(200).json(singleUser);
    }
  });
});

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put("/:userId", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
});

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete("/:userId", (req, res) => {});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put("/:userId/friends/:friendId", (req, res) => {});

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete("/:userId/friends/:friendId", (req, res) => {});

module.exports = router;
