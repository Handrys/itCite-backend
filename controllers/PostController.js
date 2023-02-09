import PostModel from '../models/Post.js';
import PostNewsModel from '../models/PostNews.js';
import PostReviewsModel from '../models/PostReviews.js'
import PostArticlesModel from '../models/PostArticles.js'


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

export const createNews = async (req, res) => {
  try {
    const doc = new PostNewsModel({
      publish_date: req.body.publish_date,
      author: req.body.author,
      id: req.body.id,
      category: req.body.category,
      categoryPresent: req.body.categoryPresent,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image
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

export const createReviews = async (req, res) => {
  try {
    const doc = new PostReviewsModel({
      publish_date: req.body.publish_date,
      author: req.body.author,
      id: req.body.id,
      category: req.body.category,
      categoryPresent: req.body.categoryPresent,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image
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

export const createArticles = async (req, res) => {
  try {
    const doc = new PostArticlesModel({
      publish_date: req.body.publish_date,
      author: req.body.author,
      id: req.body.id,
      category: req.body.category,
      categoryPresent: req.body.categoryPresent,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image
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
    const commentId = req.params.id;
   
    await PostModel.updateOne(
      {
        _id: commentId,
      },
      {
        likes: req.body
      },
    );

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