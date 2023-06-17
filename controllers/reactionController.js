/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
// const { Reaction, Thot } = require('../models');

// module.exports = {
//   // create a new reaction
//   async addReaction(req, res) {
//     try {
//       const reaction = Reaction.create(req.body);
//       const thot = Thot.findByIdAndUpdate(
//         req.params.thotId,
//         { $addToSet: { reactions: reaction._id } },
//         { new: true }
//       );

//       !thot
//         ? res.status(404).json({ message: 'Reaction created, but found no thought with that ID' })
//         : res.send({'Created the reaction 🎉': reaction});
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   },
//   // delete reaction
//   // delete reaction and remove from thought reactions array
//   async deleteReaction(req, res) {
//     try {
//       const reaction = Reaction.findByIdAndDelete(req.params.reactionId);
//       const thot = Thot.findByIdAndUpdate(
//         req.params.thotId,
//         { $pull: { reactions: reaction._id } },
//         { new: true }
//       );

//       !thot
//         ? res.status(404).json({ message: 'Tag deleted, but found no post with that ID' })
//         : res.json(reaction).message('Deleted the reaction 🎉');
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// };
