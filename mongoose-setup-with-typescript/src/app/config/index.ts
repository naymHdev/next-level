import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,

  port: process.env.PORT,

  databaseURL: process.env.DATABASE_URL,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  defaultPassword: process.env.DEFAULT_PASSWORD,

  jwt_access_secret_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,

  jwt_refresh_secret_token: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
};
