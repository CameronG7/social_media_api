/* eslint-disable no-unused-expressions */
const { Schema, model } = require('mongoose');
const Thought = require('./Thot');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'You need to provide a username!',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: 'You need to provide an email!',
      match: [
        /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
        'Please enter a valid e-mail address'
      ] // regex to validate email, thanks homework 17
    },
    thots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thot'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);
userSchema.pre('findOneAndDelete', async function (next) {
  // it upsets me that "finbyidanddelete" is not a valid query method to pass here as it makes my controller code look ugly 
  try {
    console.log('pre hook');

    const user = await this.model.findOne({ _id: this._conditions._id }).exec();

    !user
      ? console.log('no user found')
      : await Thought.deleteMany({ username: user.username }).exec().then(next());
  } catch (err) {
    console.log(err);
    return next(err);
  }
});
// after findoneandupdate to add or remove friends, does the vice versa so users are friends with each other
// wanted to make a util function to handle this but couldn't figure out handle a typeError so just made the whole thing here
userSchema.post('findOneAndUpdate', async function (next) {
  // it upsets me that "finbyidanddelete" is not a valid query method to pass here as it makes my controller code look ugly 
  // this is calling when I call findByIdAndUpdate in the controller which is what I wanted originally but not anymore so why is this calling -_-
  try {
    if (!this.options.comment) { // cancel if not a friend related query
      return;
    }
    console.log('post hook');

    // const {comment} = this.options.comment;
    const choice = this.options.comment.slice(0, 3);
    const id = this.options.comment.slice(3); // this is the id of the 2nd param in the route aka the friend from the initial user
    // this._conditions._id is the id of the user from the initial route
    console.log(choice, id, this._conditions._id);
    switch (choice) {
      case 'add':
        await this.model.updateOne(
          { _id: id },
          { $addToSet: { friends: this._conditions._id } },
          { new: true }
        );
        break;
      case 'del':
        await this.model.updateOne(
          { _id: id },
          { $pull: { friends: this._conditions._id } },
          { new: true }
        );
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

// Create a virtual property `friendCount` that is length of the user's friends array field on query
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
