import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

// console.log('config-path >>--', path.join(process.cwd()));

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
};
