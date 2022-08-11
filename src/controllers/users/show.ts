import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    const customError = new CustomError(404, 'General', `Email was not found.`);
    return next(customError);
  }
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({
      where: { email },
      relations: ['posts'],
    });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with email:${email} not found.`, ['User not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'User found', user);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
