const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({path: 'friends'})
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v')
        //.sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one user
    getUser({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // add a new User
    addUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
  
    // update a user
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
     })
    .catch(err => res.json(err));
    },
  
    // delete a User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // add a friend to user
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: { friendId: params.friendId }  } },
            { new: true, runValidators: true }
        )
        .then(dbFriendData => {
            if (!dbFriendData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err => res.json(err));
    },

    // remove friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendId: params.friendId } } },
            { new: true }
        )
        .then(dbFriendData => res.json(dbFriendData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;