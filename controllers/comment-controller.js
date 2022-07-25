const { Comment, Pizza } = require('../models');

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({_id}) => {
            return Pizza.findOneAndUpdata(
                {_id: params.pizzaId},
                {$push: { comments: _id }},
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza Found!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err=> res.json(err));
    },

    // add Reply
    AddReply({ params, body }, res) {
        Comment.findOneAndupdate(
            {_id: params.commentId},
            { $push: {replies: body}},
            { new: true }
        )
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza found!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err))
    },

    // remove reply
removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.json(err));
  },

    // remove comment
    removeComment({ parmas }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            if(!deletedComment) {
                return res.status(404).json({ message: 'No Comment found!'});
            }
            return Pizza.findOneAndUpdata(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId }},
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;