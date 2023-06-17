const router = require('express').Router();
const {
  getSingleThot,
  getThots,
  createThot,
  updateThot,
  deleteThot,
  addReaction,
  deleteReaction
} = require('../../controllers/thotController');

router.route('/')
  .get(getThots)
  .post(createThot);

router.route('/:thotId')
  .get(getSingleThot)
  .put(updateThot)
  .delete(deleteThot);

router.route('/:thotId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
