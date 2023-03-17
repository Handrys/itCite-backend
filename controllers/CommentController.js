import CommentModel from '../models/Comment.js';



/* export const commentToggle = async (req, res) => {
  try {
    const commentId = req.params.id;
    
    await CommentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      {
        comments: req.body
      },
      {
        returnDocument: 'after'
      }
    );
    console.log(req.body)
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка при добавлении/удалении лайка',
    });
  }
}; */

export const addComment = async (req, res) => {
  console.log(req.body)
  try {
    const doc = new CommentModel({
      user: req.body.userId,
      text: req.body.text,
      postId: req.body.postId,
    });

    const comment = await doc.save();

    res.json({comment});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось добавить комментарий',
    });
  }
};


export const removeComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const postId = req.params.postId;

    console.log(req.params)
    const deletedComment = await CommentModel.findOneAndDelete(
      {
        _id: commentId,
        post: postId, // Добавляем проверку, связан ли лайк с постом
      },
    );

    if (!deletedComment) {
      return res.status(404).json({
        message: 'Комментарий не найден',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить комментарий',
    });
  }
};

export const getComments = async (req, res) => {
  try {

    const comments = await CommentModel.find({postId: req.params.id})
    .populate('user')
    .limit(5)
    .exec()
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список комментариев',
    });
  }
};

