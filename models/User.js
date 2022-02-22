const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: [true, "A Valid email address is Required"],
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid emal address"],
      unique: true
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [this]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// virtual friendCount - get total count of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;