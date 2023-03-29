import { type Application } from 'express';
import GigRoutes from './gigRoutes';
import UserRoutes from './userRoutes';

export default class RouteHandler {
  constructor(app: Application) {
    app.use('/api/v1/gigs', GigRoutes);
    app.use('/api/v1/users', UserRoutes);
  }
}
