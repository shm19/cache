import mongoose from 'mongoose';

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

export const TodoModel = mongoose.model('Todo', todoSchema);
