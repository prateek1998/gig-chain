import Router from 'express';
import { Container } from 'typedi';
import GigController from '/controllers/gigs.controllers';

class GigRoutes {
  public appRouter = Router();
  public gigsCtrl = Container.get(GigController);

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.appRouter
      .route('/')
      .post((req, res) => this.gigsCtrl.addNewGig(req, res))
      .get((req, res) => this.gigsCtrl.getAllGigs(req, res));

    this.appRouter
      .route('/:gigId')
      .post((req, res) => this.gigsCtrl.updateGig(req, res));

    this.appRouter
      .route('/:gigId/assign')
      .post((req, res) => this.gigsCtrl.assignGigs(req, res));

  }
}
export default new GigRoutes().appRouter;
