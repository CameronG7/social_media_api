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
      ] // regex to validate email
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
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true
    },
    id: false
  }
);
userSchema.pre('findByIdAndDelete', async function (next) {
  try {
    await Thought.deleteMany({ username: this.username }).exec();
    next();
  } catch (err) {
    console.log(err);
  }
});

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
