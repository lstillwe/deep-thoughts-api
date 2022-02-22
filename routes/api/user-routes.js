const router = require('express').Router();

// import all user controller functions
const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


//  /api/users routes
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

// /api/users/:userId routes
router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
    .post(addFriend);

// /api/users/:userId/friends/:friendId route
router
    .route('/friends/:friendId')
    .delete(deleteFriend);

module.exports = router;