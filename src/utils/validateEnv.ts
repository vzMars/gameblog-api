import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  DATABASE_URI: str(),
  PORT: port(),
  SESSION_SECRET: str(),
});

export default env;
