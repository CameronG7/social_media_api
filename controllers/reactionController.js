/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { Reaction, Thot } = require('../models');

module.exports = {
  // create a new reaction
  async addReaction(req, res) {
    try {
      const reaction = Reaction.create(req.body);
      const post = Thot.findOneAndUpdate(
        { _id: req.body.postId },
        { $addToSet: { reaction: reaction._id } },
        { new: true }
      );

      !post
        ? res.status(404).json({ message: 'Reaction created, but found no thought with that ID' })
        : res.json('Created the tag 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = Reaction.findByIdAndDelete(req.params.reactionId );
      const post = Thot.findByIdAndUpdate(
        req.params.thotId,
        { $pull: { reaction: reaction._id } },
        { new: true }
      );

      !post
        ? res.status(404).json({ message: 'Tag deleted, but found no post with that ID' })
        : res.json('Deleted the tag 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
