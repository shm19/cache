import mongoose from 'mongoose';
import Joi from 'joi';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'todo needs title'],
  },
  description: {
    type: String,
    required: [true, 'todo needs description'],
  },
});

export interface Todo {
  title: string;
  description: string;
}

export const validateTodo = (todo: Todo): Joi.ValidationResult => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(100).required(),
  });
  return schema.validate(todo);
};

export const TodoModel = mongoose.model('Todo', todoSchema);
