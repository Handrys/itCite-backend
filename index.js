import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation, CommentCreateValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';

mongoose
  .connect('mongodb+srv://admin:admin123@itblog.ujcnuey.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', /* loginValidation, */ handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.patch(
  '/profile/:id',
  checkAuth,
  UserController.updateUser,
);



app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/tags', PostController.getLastTags);

app.get('/test', (req,res) => {
  res.send('is work...');
})

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);

app.delete('/posts/:id', checkAuth, PostController.remove);

app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.patch(
  '/posts/:id/addComment',
  checkAuth,
 /*  CommentCreateValidation, */
  handleValidationErrors,
  PostController.addComment,
);

/* app.patch(
  '/posts/:id/likeToggle',
  checkAuth,
  handleValidationErrors,
  PostController.likeToggle,
); */

app.patch(
  '/posts/:id/likeToggle',
  checkAuth,
  handleValidationErrors,
  PostController.likeToggle,
);


app.post(
  '/posts/:id/addLike',
  checkAuth,
  handleValidationErrors,
  PostController.addLike,
);

app.delete('/posts/:id/removeLike/:likeId', checkAuth, PostController.removeLike);

app.get(
  '/posts/:id/getLikes',
  handleValidationErrors,
  PostController.getLikes,
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
