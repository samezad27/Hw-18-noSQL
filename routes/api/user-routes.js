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
router.delete("/:userId", (req, res) => {
  User.findByIdAndDelete(req.params.userId, function (err) {
    if (err) {
      res.status(500).send("This user cannot be deleted");
    } else {
      res.status(200).send("Successfully deleted");
    }
  });
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.post("/:userId/friends/:friendId", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
    .then((user) =>
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true }
      )
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with that ID" })
        : res.json("Your friend has been added")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete("/:userId/friends/:friendId", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id" })
        : User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } }
          )
    )
    .then((user) => res.json({ message: "The friend has been removed." }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
