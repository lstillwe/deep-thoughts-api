const router = require('express').Router();

// import all thought contoller functions
const {
    getAllThoughts,
    getThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts routes
router
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/:userId/:thoughtId routes
router
    .route('/:thoughtId')
    .get(getThought)
    .post(addThought)
    .put(updateThought)
    .post(addReaction)
    .delete(deleteThought);

// /api/thoughts/:userId/:reactionId routes
router
    .route('/:reactionId')
    .delete(deleteReaction);

module.exports = router;