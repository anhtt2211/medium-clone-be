import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/users/User';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken } from 'utils/createJwtToken';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(404).send({
        errorType: 'General',
        message: 'Not Found',
        errors: ['Incorrect email or password'],
        errorRaw: null,
        errorsValidation: null,
      });
      // const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      // return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      res.status(404).send({
        errorType: 'General',
        message: 'Not Found',
        errors: ['Incorrect email or password'],
        errorRaw: null,
        errorsValidation: null,
      });
      // const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      // return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      // role: user.role as Role,
      created_at: user.created_at,
    };

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
    } catch (err) {
      res.status(400).send({
        errorType: 'Raw',
        message: "Token can't be created",
        errors: err,
        errorRaw: null,
        errorsValidation: null,
      });
      // const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      // return next(customError);
    }
  } catch (err) {
    res.status(400).send({
      errorType: 'Raw',
      message: "Token can't be created",
      errors: err,
      errorRaw: null,
      errorsValidation: null,
    });
    // const customError = new CustomError(400, 'Raw', 'Error', null, err);
    // return next(customError);
  }
};
