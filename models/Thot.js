const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thotSchema = new Schema(
  {
    username: {
      type: String,
      required: 'You need to provide a username!'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    reactions: [reactionSchema],
    thotText: {
      type: String,
      required: 'You need to leave a thought!',
      minLength: 1,
      maxLength: 280
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// Initialize our thot model
const Thot = model('thot', thotSchema);

module.exports = Thot;
