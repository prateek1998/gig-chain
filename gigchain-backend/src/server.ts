import 'reflect-metadata';
import App from './loaders/loader-index';
import ValidateEnv from 'utils/validateEnv.utils';

ValidateEnv();

export async function startServer() {
  const app = new App();
  app.bootstrap();
}

startServer();
