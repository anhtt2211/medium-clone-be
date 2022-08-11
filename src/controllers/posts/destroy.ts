import { Response, Request, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  const id = req.params.id;

  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Post with id:${id} doesn't exists.`]);
      return next(customError);
    }
    postRepository.delete(id);

    res.customSuccess(200, 'Post successfully deleted.', { id: post.id, title: post.title });
  } catch (error) {}
};
