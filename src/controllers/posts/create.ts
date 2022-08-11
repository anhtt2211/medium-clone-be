import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
// import { BlobStorageService } from '../../services/blob-storage.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);

  const { title, description, content, image } = req.body;
  const { id: userId } = req.jwtPayload;

  try {
    const post = new Post();
    post.title = title;
    post.description = description;
    post.content = content;
    post.createdBy = userId;
    post.userId = userId;

    const postCreated = await postRepository.save(post);
    const postResponse = await postRepository.findOne(postCreated.id, {
      relations: ['user'],
    });
    res.customSuccess(200, 'Create post success', postResponse);
  } catch (error) {
    console.log({ error });
  }
};
