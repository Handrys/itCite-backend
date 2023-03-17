import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
/*   body('firstName', 'Укажите имя').isLength({ min: 3 }),
  body('lastName', 'Укажите фамилию').isLength({ min: 3 }), */
  body('nickName', 'Укажите ник').isLength({ min: 3 }),
/*   body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(), */
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('description', 'Введите текст статьи').isLength({ min: 3 }).isString(),
/*   body('tags', 'Неверный формат тэгов').optional().isString(), */
  body('image', 'Неверная ссылка на изображение').optional().isString(),
];

export const commentCreateValidation = [
  body('text', 'Введите текст комментария').isLength({ min: 3 }).isString(),
 
];
