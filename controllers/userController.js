/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { Thot } = require('../models');
const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate(['thots', 'friends']);

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update a user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true });

      res.json(dbUserData);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndRemove(req.params.userId);
      const thotsToRemove = Thot.deleteMany({ username: dbUserData.username });

      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json({dbUserData, thotsToRemove});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const friend = await User.findById(req.params.friendId);
      // add friend to user's friend list
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      // add user to friend's friend list
      await friend.updateOne({ $addToSet: { friends: req.params.userId } });

      !friend
        ? res.status(404).json({ message: 'No user found with that ID' })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      !user
        ? res.status(404).json({ message: 'No user found with that ID' })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
