import mongoose from 'mongoose';
import { app } from './app.js';

import dotenv from 'dotenv';
dotenv.config();

const { DB_URI, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Database connection successfully');
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
