const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema to create reaction model for subdoc in thot model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    username: {
      type: String,
      required: true
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// Schema to create thought model
const thotSchema = new Schema(
  {
    username: {
      type: String,
      required: 'You need to provide a username!',
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
