import Router from 'express';
import { Container } from 'typedi';
import UserController from '/controllers/users.controllers';

class UserRoutes {
  public appRouter = Router();
  public userCtrl = Container.get(UserController);

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.appRouter
      .route('/')
      .post((req, res) => this.userCtrl.addNewUser(req, res))
      .get((req, res) => this.userCtrl.getAllUsers(req, res));

    this.appRouter
      .route('/:giggerId')
      .put((req, res) => this.userCtrl.updateUser(req, res))
  }
}
export default new UserRoutes().appRouter;
