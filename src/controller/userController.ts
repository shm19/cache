import { Request, Response } from 'express';
import { UserModel } from '../models';

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  const user = await UserModel.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  res.json({
    status: 'sucess',
    data: {
      user,
    },
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();

  res.json({
    status: 'sucess',
    result: users.length,
    data: {
      users,
    },
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await UserModel.findById(userId);

  res.json({
    status: 'sucess',
    data: {
      user,
    },
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { body } = req;

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    },
    {
      new: true,
    }
  );

  res.json({
    status: 'sucess',
    data: {
      user: updatedUser,
    },
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await UserModel.findByIdAndDelete(userId);
  res.status(204).send();
};
