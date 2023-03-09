import PostModel from '../models/Post.js';
import UserModel from '../models/User.js';
import PostNewsModel from '../models/PostNews.js';
import PostReviewsModel from '../models/PostReviews.js'
import PostArticlesModel from '../models/PostArticles.js'
import LikeModel from '../models/Likes.js'


export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const posts = await PostNewsModel.find().populate('author').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const posts = await PostArticlesModel.find().populate('author').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const posts = await PostReviewsModel.find().populate('author').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};


export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json(doc);
      },
    ).populate('author');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      author: req.body.author,
      category: req.body.category,
      categoryPresent: req.body.categoryPresent,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};


export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    await PostModel.updateOne(
      {
        _id: commentId,
      },
      {
        comments: req.body
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать комментарий',
    });
  }
};

export const likeToggle = async (req, res) => {
  try {
    const likeId = req.params.id;
    
    await PostModel.findOneAndUpdate(
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

/* export const removeLike = async (req,res) => {
    try {
      const likeId = req.params.likeId;
      const postId = req.params.postId;

      console.log(req.params)
      LikeModel.findByIdAndDelete(
        {
          _id: likeId
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'Не удалось удалить статью',
            });
          }
  
          if (!doc) {
            return res.status(404).json({
              message: 'Статья не найдена',
            });
          }
      
          res.json({
            success: true,
          });
        },
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить статьи',
      });
    }

}; */

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




/* 
export const addComment  = async (req, res) => {
  try {
    const doc = new CommentModel({
      postId: req.body.postId,
      author: req.body.author,
      text: req.body.text
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
}; */