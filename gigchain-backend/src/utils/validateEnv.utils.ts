import { cleanEnv, port, str } from 'envalid';

const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

export default ValidateEnv;
