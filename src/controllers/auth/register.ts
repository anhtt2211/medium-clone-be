import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      res.status(400).send({
        message: 'User already exists',
        errors: `Email '${user.email}' already exists`,
      });
    }

    try {
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.hashPassword();
      await userRepository.save(newUser);

      res.customSuccess(200, 'User successfully created.');
    } catch (err) {
      res.status(400).send({
        message: `User '${email}' can't be created`,
        errors: err,
      });
    }
  } catch (err) {
    res.status(400).send({
      message: 'Error',
      errors: err,
    });
  }
};
