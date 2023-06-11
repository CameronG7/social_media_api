const router = require('express').Router();
const {
  getSingleThot,
  getThots,
  createThot,
  updateThot,
  deleteThot
} = require('../../controllers/thotController');
const {
  addReaction,
  deleteReaction
} = require('../../controllers/reactionController');

router.route('/')
  .get(getThots)
  .post(createThot);

router.route('/:thotId')
  .get(getSingleThot)
  .put(updateThot)
  .delete(deleteThot);

router.route('/:ThotId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
