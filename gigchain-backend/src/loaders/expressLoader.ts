import express, { type Request, type Response, type NextFunction, type Application, urlencoded, json } from 'express';
import chalk from 'chalk';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import nocache from 'nocache';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Config from './configLoader';
import rateLimit from 'middlewares/rateLimit';
import RouteHandler from 'routes/routes-index';
class Express {
  private static readonly app: Application = express();

  public static init() {
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.listen();
  }

  private static initializeMiddlewares() {
    this.app.use(morgan(Config.LOG_FORMAT)); //, { stream }));
    this.app.use(cors({ origin: Config.ORIGIN, credentials: Config.CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(rateLimit());
    this.app.use(nocache());
    this.app.use(compression());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    });
    new RouteHandler(this.app);
  }

  private static initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'Demo App REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private static listen() {
    this.app.listen(Config.PORT, () => {
      console.log('==============================================================');
      console.log(chalk.green('App Name:\t\t\t' + Config.APP_NAME));
      console.log(chalk.green('Environment:\t\t\t' + Config.NODE_ENV));
      console.log(chalk.green('Port:\t\t\t\t' + Config.PORT));
      console.log(chalk.green('Database:\t\t\t' + Config.DB.DB_URL));
      console.log(chalk.green('App version:\t\t\t' + Config.VERSION));
      console.log('==============================================================');
    });
  }
}

export default Express;
