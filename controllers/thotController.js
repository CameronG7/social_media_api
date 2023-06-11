/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
const { Thot, User } = require('../models');

module.exports = {
  async getThots(req, res) {
    try {
      const thots = await Thot.find()
        .populate('reactions')
        .select('-__v');
      // console.log(thots.createdAt);
      res.json(thots);
    } catch (err) {
      console.error({ message: err });
      return res.status(500).json(err);
    }
  },
  async getSingleThot(req, res) {
    try {
      const thot = await Thot.findOne({ _id: req.params.thotId })
        .populate('reactions')
        .select('-__v');

      !thot
        ? res.status(404).json({ message: 'No Thot with that ID' })
        : res.json(thot);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new Thot
  async createThot(req, res) {
    try {
      const thot = await Thot.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        {
          // eslint-disable-next-line no-underscore-dangle
          $push: { thots: thot._id }
        },
        { new: true });

      !user
        ? res.status(404).json({ message: 'No user with that username' })
        : res.json(thot);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a user
  async updateThot(req, res) {
    try {
      const dbThotData = await Thot.findByIdAndUpdate(
        req.params.ThotId,
        req.body,
        { new: true }
      );

      res.json(dbThotData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a Thot
  async deleteThot(req, res) {
    try {
      const dbThotData = await Thot.findByIdAndRemove(req.params.thotId)
        .select(['-__v', '-reactions']);
      // get the user that created this thot and remove the thot from their `thots` array

      const user = await User.findOneAndUpdate(
        { username: dbThotData.username },
        { $pull: { thots: dbThotData._id } },
        { new: true }
      );

      if (!dbThotData) {
        res.status(404).json({ message: 'No thot found with that ID' });
      }

      res.json({dbThotData, user});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
