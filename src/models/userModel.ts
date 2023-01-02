import mongoose, { Document, Query } from 'mongoose';

import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'user needs name'],
  },
  email: {
    type: String,
    unique: [true, 'email should be unique'],
    required: [true, 'user needs email'],
  },
  password: {
    type: String,
    required: [true, 'user needs password'],
  },
});

const validateUser = (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(500).email().required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(user);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const updateBody = this.getUpdate() as {
    $set: { name: string; email: string; password: string };
  };
  if (updateBody.$set.password)
    updateBody.$set.password = await bcrypt.hash(updateBody.$set.password, 10);

  next();
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel, validateUser };
