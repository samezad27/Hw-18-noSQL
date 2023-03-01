const router = require("express").Router();
const { Thought, Reaction } = require("../../models");

//TODO: ROUTE TO GET ALL THOUGHTS
router.get("/", (req, res) => {
  Thought.find({}, (err, thoughts) => {
    res.status(200).json(thoughts);
  });
});

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post("/", (req, res) => {
  Thought.create(
    {
      thoughtText: req.body.thoughtText,
      createdAt: req.body.createdAt,
      username: req.body.username,
      // reactions: req.body.reactions,
    },
    (err, thought) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get("/:thoughtId", (req, res) => {
  Thought.findById(req.params.thoughtId, function (err, singleThought) {
    if (err) {
      res.status(500).send("cannot find post");
    } else {
      res.status(200).json(singleThought);
    }
  });
});

//TODO: ROUTE TO UPDATE A THOUGHT
router.put("/:thoughtId", (req, res) => {
  Thought.findByIdAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(400).json({ message: "Error updating this thought" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete("/:thoughtId", (req, res) => {
  Thought.findByIdAndRemove(req.params.thoughtId, function (err) {
    if (err) {
      res.status(500).send("This thought cannot be deleted");
    } else {
      res.status(200).send("Successfully deleted");
    }
  });
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post("/:thoughtId/reactions", (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thoughts) =>
      !thoughts
        ? res.status(404).json({ message: "No thought with this id!" })
        : res.json(thoughts)
    )
    .catch((err) => res.status(500).json(err));
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } }
  )
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
