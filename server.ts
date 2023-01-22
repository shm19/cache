// connet to db
import config from 'config';
import mongoose from 'mongoose';
import app from './src';
require('./src/services/cache');

mongoose.set('strictQuery', false);
mongoose.connect(config.get('db'));

app.listen(config.get('port') || 3000, () => {
  console.log(`Server is running... ${config.get('port')}`);
});
