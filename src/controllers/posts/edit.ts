import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { Post } from 'orm/entities/posts/Post';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { title, description, content } = req.body;

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} not found.`, ['Post not found.']);
      return next(customError);
    }

    post.title = title;
    post.description = description;
    post.content = content;

    try {
      await postRepository.save(post);
      res.customSuccess(200, 'Post successfully saved.', post);
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Post '${post.title}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
