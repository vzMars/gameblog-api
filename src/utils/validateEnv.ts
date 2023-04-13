import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  DATABASE_URI: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  CLOUD_NAME: str(),
  API_KEY: str(),
  API_SECRET: str(),
});

export default env;
