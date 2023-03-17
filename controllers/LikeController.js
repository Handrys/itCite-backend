import LikeModel from '../models/Like.js';



export const likeToggle = async (req, res) => {
  try {
    const likeId = req.params.id;
    
    await LikeModel.findOneAndUpdate(
      {
        _id: likeId,
      },
      {
        likes: req.body
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
};

export const addLike = async (req, res) => {
  console.log(req.body)
  try {
    const doc = new LikeModel({
      user: req.body.userId,
      postId: req.body.postId,
    });

    const like = await doc.save();

    res.json({like});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось поставить лайк',
    });
  }
};


export const removeLike = async (req, res) => {
  try {
    const likeId = req.params.likeId;
    const postId = req.params.postId;

    console.log(req.params)
    const deletedLike = await LikeModel.findOneAndDelete(
      {
        _id: likeId,
        post: postId, // Добавляем проверку, связан ли лайк с постом
      },
    );

    if (!deletedLike) {
      return res.status(404).json({
        message: 'Лайк не найден',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить лайк',
    });
  }
};

export const getLikes = async (req, res) => {
  try {

    const likes = await LikeModel.find({postId: req.params.id})
    .populate('user')
    .limit(5)
    .exec()
    res.json(likes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список лайков',
    });
  }
};

