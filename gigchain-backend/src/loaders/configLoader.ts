import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

class Config {
  static readonly APP_NAME = process.env.APP_NAME || 'APP Backend';
  static readonly VERSION = process.env.VERSION || '1.0.0';
  static readonly NODE_ENV = process.env.NODE_ENV || 'development';
  static readonly PORT = process.env.PORT ? parseInt(process.env.PORT) : 1433;
  static readonly SECRET_KEY = process.env.SECRET_KEY;
  static readonly LOG_FORMAT = process.env.LOG_FORMAT;
  static readonly ORIGIN = process.env.ORIGIN;
  static readonly CREDENTIALS = true;
  static readonly DB = {
    DB_URL: process.env.DB_URL || ` mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false,
  };
}

export default Config;
