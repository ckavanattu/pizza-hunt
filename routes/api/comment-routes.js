const router = require('express').Router();

const { addComment, removeComment, AddReply, removeReply } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>

router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId')
.put(AddReply)
.delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;