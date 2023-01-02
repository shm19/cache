import { Request, Response } from 'express';
import { TodoModel } from '../models';

export const createTodo = async (req: Request, res: Response) => {
  const { body } = req;
  const todo = await TodoModel.create({
    title: body.title,
    description: body.description,
  });
  res.json({
    status: 'sucess',
    data: {
      todo,
    },
  });
};

export const getAllTodos = async (req: Request, res: Response) => {
  const todos = await TodoModel.find();
  res.json({
    status: 'sucess',
    result: todos.length,
    data: {
      todos,
    },
  });
};

export const getTodoById = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const todo = await TodoModel.findById(todoId);

  res.json({
    status: 'sucess',
    data: {
      todo,
    },
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const { body } = req;

  const updatedTodo = await TodoModel.findByIdAndUpdate(
    todoId,
    {
      $set: {
        title: body.title,
        description: body.description,
      },
    },
    {
      new: true,
    }
  );

  res.json({
    status: 'sucess',
    data: {
      todo: updatedTodo,
    },
  });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  await TodoModel.findByIdAndDelete(todoId);
  res.status(204).send();
};
