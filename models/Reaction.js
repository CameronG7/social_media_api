const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
      virtuals: true
    },
    id: false
  }
);

reactionSchema // change this to match reaact req
  .virtual('getReactionCss')
  // Getter
  .get(function () {
    return `color: ${this.color}`;
  });

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;


// delete this once all confirmed working