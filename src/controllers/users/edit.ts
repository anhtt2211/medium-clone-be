import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { BlobStorageService } from 'services/blob-storage.service';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { username, name, email } = req.body;

  const userRepository = getRepository(User);
  const blobStorage = new BlobStorageService();

  try {
    const user = await userRepository.findOne({ where: { email } });
    let imageUrl = null;

    if (!user) {
      const customError = new CustomError(404, 'General', `User with email:${email} not found.`, ['User not found.']);
      return next(customError);
    }
    if (req.file) {
      imageUrl = await blobStorage.uploadFile(req.file.originalname, req.file);
    }

    user.username = username;
    user.name = name;
    user.avatar = imageUrl;

    try {
      await userRepository.save(user);
      const response: User = await userRepository.findOne({
        where: { email },
        relations: ['posts'],
      });
      res.customSuccess(200, 'User successfully saved.', response);
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `User '${user.email}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
