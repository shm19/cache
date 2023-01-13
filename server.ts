// connet to db
import config from 'config';
import mongoose from 'mongoose';
import app from './src';

mongoose.set('strictQuery', false);
mongoose.connect(config.get('db'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});
