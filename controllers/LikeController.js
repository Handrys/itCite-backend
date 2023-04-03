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
  try {
    const { userId, postId } = req.body;

    // Проверяем, есть ли уже лайк от пользователя для этого поста
    const existingLike = await LikeModel.findOne({ user: userId, postId: postId });
    if (existingLike) {
      return res.status(400).json({
        message: 'Вы уже поставили лайк на этот пост',
      });
    }

    // Если лайка еще нет, то создаем новый лайк
    const like = new LikeModel({
      user: userId,
      postId: postId,
    });

    await like.save();

    res.json({ like });
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

